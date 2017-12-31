%---------------------- SUBLIST ----------------------%
%Verifies if a list L1 is a member of a sublist L
sublist_start([],_L):- ! .
sublist_start(L1, L):- L1=[X | L12], L=[X | L2], sublist_start(L12 , L2).

sublist(L1, L) :- sublist_start(L1, L).

sublist(L1,L) :- L=[_X | L2], sublist(L1 , L2).

%switches the two players
switch_player(1,2).
switch_player(2,1).

%---------------------- RATE ----------------------%
%Counts the number of times that Elem occurs in List
rate_count(_Elem, [], N, N):- ! .

rate_count(Elem, List, N, Count):-
    List=[X | L2],
    ((X=Elem,C1 is Count + 1, rate_count(Elem, L2, N, C1));
    (X \= Elem, rate_count(Elem, L2, N, Count))).



rate(Elem, List, N):-
    rate_count(Elem, List, N, 0).


%---------------------- RATE_ADJ ----------------------%
%Gives the maximum sublist whose only element is Elem that occurs in List
rate_adj_count(_Elem, [], N, Count, Max_Count, _ElemJustAppeared):-
    (Count > Max_Count, N=Count) ;
    ( \+ (Count > Max_Count), N=Max_Count).

rate_adj_count(Elem, List, N, _Count, Max_Count, ElemJustAppeared):-
    List=[X | L2],
    ElemJustAppeared = 0,
    X \= Elem,
    rate_adj_count(Elem, L2, N, 0, Max_Count, 0).

rate_adj_count(Elem, List, N, _Count, Max_Count, ElemJustAppeared):-
    List=[X | L2],
    ElemJustAppeared = 0,
    X = Elem,
    rate_adj_count(Elem, L2, N, 1, Max_Count, 1).

rate_adj_count(Elem, List, N, Count, Max_Count, ElemJustAppeared):-
    List=[X | L2],
    ElemJustAppeared = 1,
    X \= Elem,
    ((Count>Max_Count,
    rate_adj_count(Elem, L2, N, 0, Count, 0));
    (\+ (Count>Max_Count),
    rate_adj_count(Elem, L2, N, 0, Max_Count, 0))).

rate_adj_count(Elem, List, N, Count, Max_Count, ElemJustAppeared):-
    List=[X | L2],
    ElemJustAppeared = 1,
    X = Elem,
    C1 is Count + 1,
    rate_adj_count(Elem, L2, N, C1, Max_Count, 1).


rate_adj(Elem, List, N):-
        rate_adj_count(Elem, List, N, 0, 0, 0).


%---------------------- MAX_LIST ----------------------%
%Gives the Value and Position of the maximum number that occurs in a list
max_list_aux([], Position, Value, Position, Value, _Ind):- ! .

max_list_aux(List, Position, Value, Position_tmp, Value_tmp, Ind):-
    List=[X | L2],
    Ind1 is Ind + 1,(
    (X > Value_tmp,
    max_list_aux(L2, Position, Value, Ind, X, Ind1));
    (\+ ( X > Value_tmp),
    max_list_aux(L2, Position, Value, Position_tmp, Value_tmp, Ind1))).


max_list(List, Position, Value):-
    Min is 0-10^8,
    max_list_aux(List,Position, Value, -1, Min, 1).

%---------------------- GET_LINE ----------------------%
%Gives the N th line of Board
get_line(N, Board, Line):-
    nth1(N, Board, Line).

%---------------------- REPLACE_NTH ----------------------%
%Replaces the nth element of a list
replace_nth([_|Rest], 1, X, [X|Rest]).
replace_nth([X|Rest], N, Elem, [X|NRest]):-
    N > 1, N1 is N-1, replace_nth(Rest, N1, Elem, NRest).


%---------------------- CREATE_LIST ----------------------%
%Creates a list of size N, whose only element is Elem
create_list(_Elem, 0, []):- !.

create_list(Elem, N, List):-
    List=[X | L2],
    X=Elem,
    N1 is N-1,
    create_list(Elem, N1, L2).

%---------------------- MAP_REDEFINED ----------------------%
%Redefines the function map_redefined for 4 and 5 elements
map_redefined(_Pred, [], [], []):- ! .

map_redefined(Pred, L1, L2, L3):-
    L1=[X1 | L12],
    L2=[X2 | L22],
    L3=[X3 | L32],

    call(Pred, X1, X2, X3),
    map_redefined(Pred, L12, L22, L32).

map_redefined(_Pred, [], [], [], []):- ! .

map_redefined(Pred, L1, L2, L3, L4):-

    L1=[X1 | L12],
    L2=[X2 | L22],
    L3=[X3 | L32],
    L4=[X4 | L42],
    call(Pred, X1, X2, X3, X4),
    map_redefined(Pred, L12, L22, L32, L42).
