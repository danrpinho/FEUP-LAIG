%---------------- Verificacao de Fim de Jogo ---------------%

%initial predicate to check if player won
check_for_win(Pieces, Player, Board):-
	Pieces =< 17, check_for_win(Player, Board), display_board(Board).

%checking lines columns and diagonals
check_for_win(Player, Board):- check_lines(Player,Board).
check_for_win(Player, Board):- check_colums(Player, Board).
check_for_win(Player, Board):- check_diagonals(Player, Board).
check_for_win(Player, Board):- reverse(Board, NBoard), check_diagonals(Player, NBoard).

%base model checks if a set of five consecutive player pieces exists in a line (easier checked in a list)
check_lines(Player, [X|_Rest]):- sublist([Player,Player,Player,Player,Player], X).
check_lines(Player, [_|Rest]):- check_lines(Player, Rest).

check_colums(Player, Board):- transpose(Board, TBoard), check_lines(Player, TBoard).

%obtaining a list of the coordinates where you can fit five diagonal consecutive pieces
check_diagonals(Player,Board) :- get_diagonal(1,1,Board,[],Line), check_lines(Player,[Line]).
check_diagonals(Player,Board) :- get_diagonal(1,2,Board,[],Line), check_lines(Player,[Line]).
check_diagonals(Player,Board) :- get_diagonal(1,3,Board,[],Line), check_lines(Player,[Line]).
check_diagonals(Player,Board) :- get_diagonal(2,1,Board,[],Line), check_lines(Player,[Line]).
check_diagonals(Player,Board) :- get_diagonal(3,1,Board,[],Line), check_lines(Player,[Line]).

%obtaining list with diagonal pieces
get_diagonal(8, _, _Board, Line, Line):- ! .
get_diagonal(_, 8, _Board, Line, Line):- ! .
get_diagonal(L, C, Board, Line, FLine):-
    L < 8, C < 8, L1 is L+1, C1 is C+1,
    get_line(L, Board, _tmp), nth1(C, _tmp, _value),
    append(Line, [_value], NLine),
    get_diagonal(L1,C1,Board,NLine, FLine).



