# Python Heap 자료구조 정리

힙(Heap)은 완전 이진 트리(Complete Binary Tree)의 일종으로, 
트리의 각 노드는 키(Key) 값과 연관된 데이터를 가지고 있습니다.
이진 탐색 트리와 달리, 힙은 부모 노드의 키 값이 항상 
자식 노드의 키 값보다 크거나 작은 정렬 방식을 가지고 있습니다.

정렬방식
- 최소 힙: 부모 노드의 키값이 자식 노드의 키값보다 항상 작은 힙
- 최대 힙: 부모 노드의 키값이 자식 노드의 키값보다 항상 큰힙

## heapq
파이썬에서는 `heapq` 모듈을 이용하여 힙을 사용할 수 있습니다.

모든 부모 노드는 그의 자식 노드보다 값이 작거나 큰 이진트리(Binary tree) 구조인데
내부적으로는 인덱스 0에서 시작해 k번째 원소가 항상 자식 원소들 보다 작거나 같은 `최소 힙`의
형태로 정렬됩니다.

## heapq method

- heapq.heappush(heap,item) : item을 heap에 추가
- heapq.heqppop(heap): heap에서 가장 작은 원소를 pop & 리턴, 비어 있는 경우 IndexError가 호출됨.
- heapq.heapify(list): 리스트를 heap으로 변환

## heapq 사용 예시


```python
import heapq

heap = []
// 추가
heapq.heappush(heap,10)
heapq.heappush(heap.30)
heapq.heappush(heap,20)

print(heap) // [10,20,30]

//삭제
result = heapq.heapqpop(heap)
print(result) // 10
print(heap) // [20,30]


//리스트를 heap으로 변환
preGeneratedList= [10,30,20]
heapq.heapify(preGeneratedList)
pirnt(preGeneratedList) // [10,30,20]

```

### 최대힙 만들기
heap는 최소힙을 기준으로 만들어집니다. 따라서 최대 힙을 구하기 위해서는 아래와 같이
코드를 작성해야 합니다.

```python
import heapq

my_list = [5, 3, 8, 4, 2]
my_heap = []

for element in my_list:
    heapq.heappush(my_heap, -element)

print(my_heap)  # [-8, -5, -3, -4, -2]
```

만드는 방법은 간단합니다. heapq에 push를 수행할때 음수부호(-) 를 추가하여 
힙을 만들고 

```python
max_element = -heapq.heappop(my_heap)
print(max_element)  # 8
```

호출 시점에 다시 - 부호를 붙여 최대값을 찾을 수 있습니다.


