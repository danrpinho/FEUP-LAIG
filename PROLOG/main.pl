:-use_module(library(lists)).
:-use_module(library(apply)).
:-use_module(library(sockets)).
:-use_module(library(codesio)).
:-include('user_interface.pl').
:-include('utils.pl').
:-include('make_move.pl').
:-include('end_move.pl').
:-include('cpu.pl').


%--------------------- Loop geral do jogo --------------------%
port(8081).

shiftago:-
	port(Port),
	write('Opened Server'),nl,nl,
	socket_server_open(Port, Socket),
	server_loop(Socket),
	socket_server_close(Socket),
	write('Closed Server'),nl.

	
server_loop(Socket) :-
	repeat,
	socket_server_accept(Socket, _Client, Stream, [type(text)]),
		% write('Accepted connection'), nl,
	    % Parse Request
		catch((
			read_request(Stream, Request),
			read_header(Stream)
		),_Exception,(
			% write('Error parsing request.'),nl,
			close_stream(Stream),
			fail
		)),
		
		% Generate Response
		abolish_predicates,
		handle_request(Request, MyReply, Status),
		format('Request: ~q~n',[Request]),
		format('Reply: ~q~n', [MyReply]),
		
		% Output Response
		format(Stream, 'HTTP/1.0 ~p~n', [Status]),
		format(Stream, 'Access-Control-Allow-Origin: *~n', []),
		format(Stream, 'Content-Type: text/plain~n~n', []),
		format(Stream, '~p', [MyReply]),
	
		% write('Finnished Connection'),nl,nl,
		close_stream(Stream),
	(Request = quit), !.
	
close_stream(Stream) :- flush_output(Stream), close(Stream).	

% Reads first Line of HTTP Header and parses request
% Returns term parsed from Request-URI
% Returns syntax_error in case of failure in parsing
read_request(Stream, Request) :-
	read_line(Stream, LineCodes),
	print_header_line(LineCodes),
	
	% Parse Request
	atom_codes('GET /',Get),
	append(Get,RL,LineCodes),
	read_request_aux(RL,RL2),	
	
	catch(read_from_codes(RL2, Request), error(syntax_error(_),_), fail), !.
read_request(_,syntax_error).
	
read_request_aux([32|_],[46]) :- !.
read_request_aux([C|Cs],[C|RCs]) :- read_request_aux(Cs, RCs).


% Reads and Ignores the rest of the lines of the HTTP Header
read_header(Stream) :-
	repeat,
	read_line(Stream, Line),
	print_header_line(Line),
	(Line = []; Line = end_of_file),!.

check_end_of_header([]) :- !, fail.
check_end_of_header(end_of_file) :- !,fail.
check_end_of_header(_).

% Function to Output Request Lines (uncomment the line bellow to see more information on received HTTP Requests)
% print_header_line(LineCodes) :- catch((atom_codes(Line,LineCodes),write(Line),nl),_,fail), !.
print_header_line(_).

handle_request(Request, MyReply, '200 OK') :- catch(parse_input(Request, MyReply),error(_,_),fail), !.
handle_request(syntax_error, 'Syntax Error', '400 Bad Request') :- !.
handle_request(_, 'Bad Request', '400 Bad Request').

/*varneg(X):-	\+ var(X).

varList(List):- \+ (maplist(varneg, List)).

concat([], ''):- ! .

concat([Elem | List], Result):-
	varList(List), \+ var(Result), !,
	atom_concat(Elem, Result2, Result),
	concat(List, Result2).


concat([Elem | List], Result):-
	concat(List, Result2),
	atom_concat(Elem, Result2, Result).*/

abolish_predicates:-
	abolish(game_mode/1),
	abolish(cpu_level/1),
	abolish(cpu_player/1).

parse_input( shiftago(player,CurrentPlayer,Board,CurrentPieces,Edge,Row), MyReply):-
	asserta(cpu_level(0)),
	player_play(Board, Edge, Row, CurrentPlayer, CurrentPieces, MyReply).

parse_input( shiftago(cpu,CurrentPlayer,Difficulty,Board,CurrentPieces), MyReply):-
	asserta(cpu_level(Difficulty)),
	cpu_play(Board, CurrentPlayer, CurrentPieces, MyReply).	
	
player_play(Board, Edge, Row, CurrentPlayer, CurrentPieces, MyReply):-	
	insert_piece(Board, Edge, Row, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces), !,(
	(winner(NewCurrentPieces, CurrentPlayer, NewBoard, Winner), MyReply = ['GameOver',CurrentPlayer, Winner, [Edge , Row], NewBoard] ); 
	(switch_player(CurrentPlayer, NewPlayer), MyReply = ['Valid',NewPlayer, NewCurrentPieces, [Edge , Row], NewBoard])
	).

player_play(_Board, _Edge, _Row, CurrentPlayer, _CurrentPieces, MyReply):-	
	MyReply = ['Invalid',CurrentPlayer].

cpu_play(Board, CurrentPlayer, CurrentPieces, MyReply):-
	cpu_move(Board, CurrentPlayer, Move, NewBoard, CurrentPieces, NewCurrentPieces),(
	(winner(NewCurrentPieces, CurrentPlayer, NewBoard, Winner), MyReply = ['GameOver',CurrentPlayer, Winner, Move, NewBoard] ); 
	(switch_player(CurrentPlayer, NewPlayer), MyReply = ['Valid',NewPlayer, NewCurrentPieces, Move, NewBoard])
	).


	
winner(NewCurrentPieces, CurrentPlayer, NewBoard, Winner):-
	(check_for_win(NewCurrentPieces, CurrentPlayer, NewBoard),
	Winner = CurrentPlayer) ;
	(NewCurrentPieces = 0, switch_player(CurrentPlayer, NewPlayer),
	Winner = NewPlayer).
		
		

