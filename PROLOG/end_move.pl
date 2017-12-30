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


%---------------------- Fim de Jogada ----------------------%

%ends move by first checking if the player one, then if the player lost and then
%changing the player and starting a new move

end_move(CurrentPlayer, NewBoard, _OpponentPieces, NewCurrentPieces):-
    check_for_win(NewCurrentPieces, CurrentPlayer, NewBoard),
    end_game(CurrentPlayer).

end_move(CurrentPlayer, NewBoard, _OpponentPieces, 0):-
	switch_player(CurrentPlayer, NewPlayer),
	display_board(NewBoard),
	write('Player '), write(CurrentPlayer),
	write(', you are out of pieces!'), nl,
	end_game(NewPlayer).

end_move(CurrentPlayer, NewBoard, OpponentPieces, NewCurrentPieces):-
    game_mode(1),
    switch_player(CurrentPlayer, NewPlayer),
    player_vs_player(NewBoard, OpponentPieces, NewCurrentPieces, NewPlayer).

end_move(CurrentPlayer, NewBoard, OpponentPieces, NewCurrentPieces):-
    game_mode(2),
    switch_player(CurrentPlayer, NewPlayer),
    player_vs_cpu(NewBoard, OpponentPieces, NewCurrentPieces, NewPlayer).

end_move(CurrentPlayer, NewBoard, OpponentPieces, NewCurrentPieces):-
    game_mode(3),
    switch_player(CurrentPlayer, NewPlayer),
    cpu_vs_cpu(NewBoard, OpponentPieces, NewCurrentPieces, NewPlayer).

%ends game and asks if the player would like to play again
end_game(Player):-
    write('Game over, winner is player '), write(Player), write('!'), nl,
    abolish(game_mode/1), abolish(cpu_player/1), abolish(cpu_level/1),
    get_boolean('Would you like to return to the main menu? (yes/no)', Choice),
    return_to_main_menu(Choice).

