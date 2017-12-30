
%-------------------- Auxiliar predicates -------------------%

%checks if a move is possible
possible_move(Line):-
    member(0, Line).

%inserts piece at the beginning of a line
insert_head_line(Player,Line,NLine):-
    append([Player],Line,NLine).

%inserts piece at the end of a line
insert_end_line(Player,Line,NLine):-
    append(Line,[Player],NLine).

%removes the first zero in a line
remove_first_zero(Line, NLine) :-
	Line = [0 | Line2],
	NLine = Line2.

remove_first_zero(Line, NLine) :-
	Line = [X | Line2],
	X \= 0,
	NLine = [X | NLine2],
	remove_first_zero(Line2, NLine2).

remove_first_zero([],[]).

%removes the last zero in a line
remove_last_zero(Line, NLine) :-
	reverse(Line, _Line2),
	remove_first_zero(_Line2, _NLine2),
	reverse(_NLine2, NLine).


%------------------- Obtaining player move ------------------%
%asks the player for their move (board edge and line/column)
get_move(Edge, Row):-
    repeat,
        once(get_edge(Edge)), once(get_row(Row)).

%gets the edge
get_edge(Edge):-
    write('Choose a board edge to insert the piece (up, down, left, right): '), nl,
    read(Edge), member(Edge,['up', 'down', 'left', 'right']).

get_edge(Edge):-
    write('Invalid edge; Try again.'), nl,
    get_edge(Edge).

%gets the row
get_row(Row):-
    get_integer('Choose a row: ', 1, 7,Row).


%---------------- Insert piece on board edge ----------------%
%inserts a piece in the board (predicate called by the main game predicate)
insert_piece(Board, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces):-
	get_move(Edge, Row),
	insert_piece(Board, Edge, Row, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces).

insert_piece(Board, left, N, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces):-
    get_line(N, Board, Line), possible_move(Line),
    remove_first_zero(Line, _line), insert_head_line(CurrentPlayer, _line, NLine),
    replace_nth(Board, N, NLine, NewBoard),
    NewCurrentPieces is CurrentPieces - 1.

insert_piece(Board, right, N, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces):-
    get_line(N, Board, Line), possible_move(Line),
    remove_last_zero(Line, _line), insert_end_line(CurrentPlayer, _line, NLine),
    replace_nth(Board, N, NLine, NewBoard),
    NewCurrentPieces is CurrentPieces - 1.

insert_piece(Board, up, N, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces):-
    transpose(Board, _tempInit),
    insert_piece(_tempInit, left, N, CurrentPlayer, _tempEnd, CurrentPieces, NewCurrentPieces),
    transpose(_tempEnd, NewBoard).

insert_piece(Board, down, N, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces):-
    transpose(Board, _tempInit),
    insert_piece(_tempInit, right, N, CurrentPlayer, _tempEnd, CurrentPieces, NewCurrentPieces),
    transpose(_tempEnd, NewBoard).