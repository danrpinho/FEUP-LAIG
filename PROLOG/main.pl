:-use_module(library(lists)).
:-include('user_interface.pl').
:-include('utils.pl').
:-include('make_move.pl').
:-include('end_move.pl').
:-include('cpu.pl').


%--------------------- Loop geral do jogo --------------------%
%main game function
shiftago:-
    display_main_menu,
    get_integer('Please choose an option: ', 0, 3, GameOption),
    menu_option(GameOption).

%exits game
menu_option(0).

%starts player vs player
menu_option(1):-
    asserta(game_mode(1)), asserta(cpu_level(0)), asserta(cpu_player(0)),
    init(Board, PlayerOnePieces, PlayerTwoPieces),
    player_vs_player(Board, PlayerOnePieces, PlayerTwoPieces, 1).

%starts player vs ai
menu_option(2):-
    asserta(game_mode(2)), once(get_cpu_difficulty), asserta(cpu_player(2)),
    init(Board, PlayerOnePieces, PlayerTwoPieces),
    player_vs_cpu(Board, PlayerOnePieces, PlayerTwoPieces, 1).

%starts ai vs ai
menu_option(3):-
    asserta(game_mode(3)), once(get_cpu_difficulty), asserta(cpu_player(0)),
    init(Board, PlayerOnePieces, PlayerTwoPieces),
    cpu_vs_cpu(Board, PlayerOnePieces, PlayerTwoPieces, 1).

%creates a blank board
init([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]], 22, 22).

%---------------------- Player vs Player ---------------------%
%shows the board, asks for the pieces, makes the move and then ends the current play
player_vs_player(Board, CurrentPieces, OpponentPieces, CurrentPlayer):-
    display_board(Board),
    write_pieces(CurrentPlayer, CurrentPieces),
    insert_piece(Board, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces),
    end_move(CurrentPlayer, NewBoard, OpponentPieces, NewCurrentPieces).

%----------------------- Player vs CPU -----------------------%
player_vs_cpu(Board, CurrentPieces, OpponentPieces, CurrentPlayer):-
    cpu_player(CurrentPlayer), !,
    display_board(Board),
    cpu_move(Board, CurrentPlayer, Move, NewBoard, CurrentPieces, NewCurrentPieces),
    display_move(CurrentPlayer, Move),
    end_move(CurrentPlayer, NewBoard, OpponentPieces, NewCurrentPieces).

player_vs_cpu(Board, CurrentPieces, OpponentPieces, CurrentPlayer):-
    display_board(Board),
    write_pieces(CurrentPlayer, CurrentPieces),
    insert_piece(Board, CurrentPlayer, NewBoard, CurrentPieces, NewCurrentPieces),
    end_move(CurrentPlayer, NewBoard, OpponentPieces, NewCurrentPieces).

%------------------------- CPU vs CPU ------------------------%
cpu_vs_cpu(Board, CurrentPieces, OpponentPieces, CurrentPlayer):-
    display_board(Board),
    cpu_move(Board, CurrentPlayer, Move, NewBoard, CurrentPieces, NewCurrentPieces),
    display_move(CurrentPlayer, Move),
    end_move(CurrentPlayer, NewBoard, OpponentPieces, NewCurrentPieces).
