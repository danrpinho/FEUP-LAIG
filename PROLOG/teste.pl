:-use_module(library(lists)).



%--------------------------------------------TESTS-----------------------------------------------------------------------------------
display_boards(ListOfBoards):-
        ListOfBoards=[0 | L2],
        write(' 0 '),nl,
        display_boards(L2).
        
display_boards(ListOfBoards):-
        ListOfBoards=[Board | L2],
        display_board(Board),
        display_boards(L2).

display_boards([]).

%valid_moves test
test1:-
        valid_moves([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],1,K),
        display_boards(K).


test2:-
        valid_moves([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,1,1]],1,K),
        display_boards(K).

test3:-
        valid_moves([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,1,0]],1,K),
        display_boards(K).

%max_pieces_adj_aux test
test4:-
        max_pieces_adj([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,1,0]],1,P, V),
        write(P), write('  '), write(V).

test5:-
        max_pieces_adj([[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[1,1,1,1,1,1,0]],1,P, V),
        write(P), write('  '), write(V).

test6:-
        max_pieces_adj([[0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,1,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,1,0,0],[0,0,0,0,0,1,0]],1,P, V),
        write(P), write('  '), write(V).
test7:-
        max_pieces_adj([[0,0,0,0,0,1,0],[0,0,0,0,1,0,0],[0,0,0,1,0,0,0],[0,0,1,0,0,0,0],[0,1,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0]],1,P, V),
        write(P), write('  '), write(V).

%value_formula
test8:-
        value_formula([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,1,0]],1, V),
        write(V).

test9:-
        value_formula([[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[0,1,0,0,0,0,0],[1,1,1,1,1,1,0]],1, V),
        write(V).

test10:-
        value_formula([[0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,1,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,1,0,0],[0,0,0,0,0,1,0]],1, V),
        write(V).
test11:-
        value_formula([[0,0,0,0,0,1,0],[0,0,0,0,1,0,0],[0,0,0,1,0,0,0],[0,0,1,0,0,0,0],[0,1,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0]],1, V),
        write(V).
test12:-
        value_formula([[0,0,0,0,0,0,1],[0,0,0,0,0,1,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,0,0,0,0,0],[1,0,0,0,0,0,0]],1, V),
        write(V).

test13:-
        value_formula([[1,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,0,0,0,0,0,0]],1, V),
        write(V).

%value
test14:-
        value([[2,0,0,0,0,0,0],[0,2,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,1,0]],2, V),
        write(V).
test15:-
        value([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,2,0,2,2,1,0]],1, V),
        write(V).

test16:-
        value([[1,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,0,0,0,0,0,0]],1, V),
        write(V).

test17:-
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,2]]),
        value([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,2]],2, V),
        write(V).

test192:-
                assert(cpu_level(3)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,0,0,0,0,0],[1,2,1,1,0,0,0]]),
        value([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,1,0,0,0,0,0],[1,2,1,1,0,0,0]],2, V),
        write(V).

%cpu_move 
test18:-
        abolish(cpu_level/1),
		asserta(cpu_level(3)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,2,0,2,2,1,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,2,0,2,2,1,0]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).



test19:-
        abolish(cpu_level/1),
		asserta(cpu_level(3)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,0,0,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,0,0,0]],2, Move,NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test201:-
        abolish(cpu_level/1),
        asserta(cpu_level(3)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]),
        cpu_move( [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],1, Move, NewBoard, 22, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).
test20:-
        abolish(cpu_level/1),
		asserta(cpu_level(3)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,2]]),
        cpu_move( [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,2]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test21:-
        abolish(cpu_level/1),
		asserta(cpu_level(3)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,0]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test22:-
        abolish(cpu_level/1),
         asserta(cpu_level(2)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,2,0,2,2,1,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,2,0,2,2,1,0]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).



test23:-
        abolish(cpu_level/1),
         asserta(cpu_level(2)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,0,0,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,0,0,0]],2, Move,NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test24:-
        abolish(cpu_level/1),
                asserta(cpu_level(2)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,2]]),
        cpu_move( [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,2]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test25:-
        abolish(cpu_level/1),
                asserta(cpu_level(2)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,0]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test26:-
        abolish(cpu_level/1),
         asserta(cpu_level(1)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,2,0,2,2,1,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,2,0,2,2,1,0]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).



test27:-
        abolish(cpu_level/1),
         asserta(cpu_level(1)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,0,0,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,0,0,0]],2, Move,NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test28:-
        abolish(cpu_level/1),
                asserta(cpu_level(1)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,2]]),
        cpu_move( [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,2]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test29:-
        abolish(cpu_level/1),
                asserta(cpu_level(1)),
        display_board([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,0]]),
        cpu_move([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0],[0,0,0,2,0,0,0],[0,0,0,0,2,0,0],[0,0,0,0,0,2,0],[1,1,1,1,0,0,0]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).

test30:-
        max_pieces_adj([[2,1,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],2,_Position, Value),
        write(Value).

test31:-
        abolish(cpu_level/1),
         asserta(cpu_level(2)),
        display_board([[2,1,1,1,1,0,0],[2,1,2,1,2,1,2],[1,2,0,0,0,0,0],[2,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]),
        cpu_move([[2,1,1,1,1,0,0],[2,1,2,1,2,1,2],[1,2,0,0,0,0,0],[2,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],2, Move, NewBoard, 4, NewCurrentPieces),
        display_board(NewBoard),
        write('Move: '),write(Move),
        write('\nNew Current Pieces: '), write(NewCurrentPieces).
        




summ(A,B,C,D):-
        D is A+B+C.  