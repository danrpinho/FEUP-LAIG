%---------------------- Print menu ----------------------%
%mostra o titulo do jogo
display_title:-
    write('      _     _  __ _'), nl,
    write('     | |   (_)/ _| |'), nl,
    write('  ___| |__  _| |_| |_ __ _  __ _  ___'), nl,
    write(' / __| \'_ \\| |  _| __/ _` |/ _` |/ _ \\'), nl,
    write(' \\__ \\ | | | | | | || (_| | (_| | (_) |'), nl,
    write(' |___/_| |_|_|_|  \\__\\__,_|\\__, |\\___/ '), nl,
    write('                            __/ |'), nl,
    write('                           |___/'), nl.

%mostra as opcoes do menu
display_options:-
    write('+------------------------------------+'), nl,
    write('  1. Player vs Player'), nl,
    write('  2. Player vs COM'), nl,
    write('  3. COM vs COM'), nl,
    write('  0. Exit'), nl,
    write('+------------------------------------+').

%mostra o menu principal
display_main_menu:-
    display_title, nl, display_options, nl.

%---------------------- Print board ---------------------%
%chamadas recursivas
display_matrix(8, _).
display_matrix(N, [L|T]) :-
    N1 is N+1, N =< 7,
    display_line(L, N),
    display_matrix(N1, T).

%imprime a linha
display_line(L, N):-
    write(N), put_char(' '),
    put_char('|'), display_line(L).

%transforma caracteres internos a matriz em elementos representados
translate_char(0,'.').
translate_char(1,'X').
translate_char(2,'O').

%ultimo elemento da linha
display_line([X]) :- translate_char(X,N), write(N), write('|'), put_code(10).
display_line([X|R]) :- translate_char(X,N), write(N), write(' '), display_line(R).

%escreve o tabuleiro
display_top :- write('   1 2 3 4 5 6 7'), put_code(10).
display_edge :- write('  +-------------+'), put_code(10).
display_board(X):- display_top, display_edge, display_matrix(1, X), display_edge.

display_move(Player, Move):-
    write('CPU player '), write(Player), write(' played '), write(Move), write('.'), nl.

%writes the number of pieces
write_pieces(Player, 1):-
    write('Player '), write(Player),
    write(', it\'s your turn. You only have one piece left, make it count!'), nl.

write_pieces(Player, Pieces):-
    write('Player '), write(Player),
    write(', it\'s your turn. You have '),
    write(Pieces), write(' pieces left.'), nl.

%--------------------- Obter inputs --------------------%
get_integer(Prompt, Min, Max, Option):-
    write(Prompt), nl,
    read(Option), integer(Option),
    Option >= Min, Option =< Max.

get_integer(Prompt, Min, Max, Option):-
    write('Invalid input; Try again.'), nl, get_integer(Prompt, Min, Max, Option).

get_boolean(Prompt, Option):-
    write(Prompt), nl,
    read(Option), member(Option, ['yes', 'no']).

%checks if the player wants to leave the game
return_to_main_menu(no).
return_to_main_menu(yes):-
    shiftago.

get_cpu_difficulty:-
    get_integer('Please choose a difficulty level for the CPU (1,2,3):', 1, 3, Level),
    asserta(cpu_level(Level)).

/*
   1 2 3 4 5 6 7
  +-------------+
1 |. . O . X . .|
2 |. . . O X X O|
3 |. . . . O . .|
4 |. . . . X O X|
5 |. . . . . . O|
6 |X X . . . . .|
7 |. . . . O . .|
  +-------------+
*/