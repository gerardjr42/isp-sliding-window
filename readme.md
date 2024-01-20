# **Sliding Window Technique**

## Our goal for today:

 >"When programming, we don't want to memorize the question or solution. We want to memorize the mental model, or at least understand the mental model. That way we can apply our knowledge to a broad range of problems." 
 	> -Ryan Schachte (*Computer Systems Engineer at Cloudflare*). [^1] 
- Understand when we can implement this algorithm
- Understand the steps to get a broader sense of what the algorithm is doing

## Sliding Window Algorithm
> "*A computational technique that aims to reduce the use of nested loops and replace it with a single loop, thereby reducing the time complexity to O(n)*" 
  > -geeksforgeeks [^2]
- Maintains a "window" of elements and updates it as it move through the array
- Window is typically constant in length but can change in size.
- *Note: Each element enters and exits the window once.*


## Benefits of Sliding Window
Using Sliding Window allows us to work with a time complexity of 0 of N, linear.
*Makes this technique an efficient time complexity algorithm*
-  This is an optimal solution. Especially when working with large data, we must always strive for the best optimal time complexity.

## What is the Criteria
- Must be a continuous sequence of elements:
  - Elements that are grouped adjacently in a continuous sequence: Ex: index 0,1,2
- Works with both strings and arrays

## Use Cases
- Fixed Length: When the substring / subarray is of fixed size:
	- min
	- max
	- running average
	-  contained (whether it contains x, y, z)
- Dynamic variant: Sliding Windows length increases and decreases (Caterpillar)
	- Examples:
	- longest (Ex: Longest Sum  >= to some value of S)
	- shortest (Ex: Shortest sum <= to some value of S) 
- Dynamic with Auxillary data structure
   > a fancy way of saying helper data structure. Something you might use to solve a given problem and is terminated after the problem is solved.  
  > *stack overflow [^3]*
  - Ex: Longest substring w / no more than* k* distinct characters. 
  -  
## Edge cases and concerns
- Empty Array:
  - Edge Case: When the input array is empty, as there are no elements to process.
Consideration: Ensure the algorithm gracefully handles this scenario without errors or unexpected behavior.

- Window Size Larger Than Array:
  - Edge Case: When the specified window size is larger than the size of the input array.
Consideration: Decide on the appropriate behavior; it might involve processing the entire array or applying a different strategy.

- Fixed Window Size:
  - Edge Case: When the window size is fixed, and the input array size is not a multiple of the window size.
Consideration: Determine how to handle the last window, which may have fewer elements than the specified window size.

- Single-Element Array:
  - Edge Case: When the input array contains only one element.
Consideration: Ensure that the algorithm correctly handles and processes arrays with minimal size.
## Question: Fixed Length
Given an array of integers and a positive integer K, find the maximum sum of a subarray of size K.
### Starting template

```javascript
function maxSumSubarray(arr, k) {
  // Your code here
}

const array = [3, 6, 5, 9 ,3, 7, 3]; //Array length of 7
const k = 3; //Our Sliding Window with length of 3

console.log(maxSumSubarray(array, k)); // Expected output: ?
```


### Visual Representation
Can you spot the pattern here?
```javascript
//Each block represents an element in the array 

// Initial Array: [3, 6, 5, 9 ,3, 7, 3];

// Initial Window: 
//  [3,  6,  5] => Sum: 14
// | █ | █ | █ |  |  |  |  |  

// Slide Window to the right: 
//     [6,  5,  9] => Sum: 20 (Maximum)
// |  | █ | █ | █ |  |  |  |

// Slide Window to the right: 
//        [5,  9,  3] => Sum: 17
// |  |  | █ | █ | █ |  |  | 

// Slide Window to the right: 
//           [9,  3,  7] => Sum: 19
// |  |  |  | █ | █ | █ |  |  

// Slide Window to the right: 
//              [3,  7,  3] => Sum: 13 
// |  |  |  |  | █ | █ | █ |
```

## Fixed Length: Step By Step Procedure

#### 1. Create our variables. 
##### What are we looking for?

```javascript
let maxSum = 0 //Initialize the maximum sum to 0
let currentSum = 0 //Initialize the sum of current window to 0
```
#### 2. Initialize our sliding window
##### Begin by getting the sum of the first window
```javascript
for (let i = 0; i < k; i++) {
  currentSum += arr[i];
}
```

#### 3. Start moving the sliding window
```javascript
for (let i = k; i < arr.length; i++)
```


#### 4. Calculate the sum of each sliding window iteration. 
##### Remove the first element from sliding window count
```javascript
currentSum = currentSum - arr[i - k]
```
##### Add the next element to the sliding window
```javascript
currentSum = currentSum - arr[i - k] + arr[i]
```

#### 5. Update maxSum for each iteration of the sliding window

##### Using Math.max()
```javascript
maxSum = Math.max(maxSum, currentSum);
```

##### Using an if statement
```javascript
if (currentSum > maxSum) {
      maxSum = currentSum;  
    }
```

#### 6. Return maxSum
```javascript
return maxSum;
```
˛
## Time Complexity
In the above example we have:
- First loop: Time complexity **O of k**: *k is constant*
- Second loop: Time complexity of **O of (N - k)**: 
  - Not a nested loop, iterates through each element once where N is the length of the array
- Conclusion: Always choose the worst case scenario: 
- In this case: O(k) + O(N - k) is a time complexity of **O of N** (*linear*). *Makes this technique an efficient time complexity algorithm*
- This is the optimal solution. Especially when working with large data.
-  *Always strive for the best optimal time complexity.*

## Question: Dynamic Length 
Find the length of the smallest subarray with a sum greater than or equal to the target sum.
### Starting template
```javascript
function smallestSubArraySum(array, targetSum) {
  //code here
}

const array = [3, 6, 5, 9, 3, 7, 3];
const targetSum = 8;

console.log(smallestSubArraySum(array, targetSum));
```
### Visual Representation
```javascript
//Each block represents an element in the array 

// Initial Array: [3, 6, 5, 9 ,3, 7, 3];

// Initial Window: 
//  [3] => Sum: 3 // currentSum >= 8 ? No, increases length
// | █ |  |  |  |  |  |  |  

// Slide Window to the right: 
//  [ 3, 6] => Sum: 9 //currentSum >= 8 ? Yes, windowLength = 2, remove 1st elem
// | █ | █ |  |  |  |  |  | 

// Slide Window to the right: 
//     [6] => Sum: 6 // currentSum >=8 ? No, increases length
// |  | █ |  |  |  |  |  | 

// Slide Window to the right: 
//     [6,  5] => Sum: 11 // currentSum >= 8? Yes, window  2, removes 1st elem
// |  | █ | █ |  |  |  |  |  

// Slide Window to the right: 
//        [5] => Sum: 5 // currentSum >=8? No; increase length
// |  |  | █ |  |  |  |  |

// Slide Window to the right: 
//        [5,  9] => Sum: 14 // current Sum >=8? Yes, window still 2, remove 1st element
// |  |  | █ | █ |  |  |  |

// Slide Window to the right: 
//           [9] => Sum: 9 //currentSum >=8? Yes, window = 1, we found our min
// |  |  |  | █ |  |  |  |

// In this case there is nothing smaller that a subarray with length 1 so we can end the visual here.
```
## Dynamic Length: Step By Step Procedure
#### 1. Create our variables
##### What are we looking for?
```javascript
let minWindowLength = Infinity;
let currentSum = 0; //Start the accumulator at 0 
let end = 0; //Start and End the window at 0 
//Picture this as a caterpillar, the end is the tail.
```

#### 2. Initialize our sliding window
##### Begin by getting the sum of the first window
```javascript
for (let start = 0; start < array.length; start++) { 
    currentSum += arr[start];
//Picture this as a caterpillar, the start is the head.
```

#### 3. Start the movement with a "while loop"
```javascript
while (currentSum >= targetSum) {
```
#### 4. Compare minLength
##### If currentSum > targetSum, compare minLength to currentLength
```javascript
minWindowLength = Math.min(minWindowLength, start - end + 1); 
//start - end + 1 = currentLength
```

#### 5. Now that our minLength is Updated we need to update our currentSum to keep comparing
##### We have to eliminate the start element from currentWindow
##### We then have to increment window by 1.
```javascript
currentSum -= array[end]; //Eliminate the element at end from the currentSum
end++; //Increment the end to move forward for each iteration
```

#### 6. Return minimum window length
```javascript
return minWindowLength;
```

## Time Complexity of Dynamic Sliding Window
n the above example we have:
- First loop: Time complexity **O of N**: 
  - *Where N is the # of elements in the array*
- While loop: Time complexity of **O of N)**: 
  - Iterates through each element once depending on the condition if currentSum >= target Sum
- Conclusion: Time complexity of O of N
- *It's important to note that even though there is a nested loop (while loop inside the for loop), the total number of iterations is still proportional to the length of the array. Therefore, the overall time complexity is linear.*
- 

## Real World Scenarios
### Okay cool, but will I ever use this in a real world scenario as a programmer?
- Consecutive elements operations
	- We discussed this above: min, max, longest, shortest
- String matching / Substring search
	- Detecting if a particular pattern or substring exists in a larger text efficiently.
- Image Processing
	- Analyzing a window of pixels in an image for specific features or patterns.
- Time Series Analysis
	- Analyzing trends or patterns in time-series data by considering a moving window of data points.
- Real-time data steaming
	- Handling continuous streams of data by maintaining a window and updating it as new data arrives.
- Video Streaming
	- process the video data in small windows, which can improve the efficiency of your video streaming algorithms
- Network and traffic monitoring
	- Detecting patterns or anomalies in network traffic by sliding through packets or connections.
- Stock Price Movements
	- Analyzing a moving window of stock prices to identify trends or patterns.
- DNA Sequence Analysis
	- Identifying specific sequences or patterns in DNA by sliding through the sequence data.- Consecutive elements operations
	- We discussed this above: min, max, longest, shortest
- String matching / Substring search
	- Detecting if a particular pattern or substring exists in a larger text efficiently.
- Image Processing
	- Analyzing a window of pixels in an image for specific features or patterns.
- Time Series Analysis
	- Analyzing trends or patterns in time-series data by considering a moving window of data points.
- Real-time data steaming
	- Handling continuous streams of data by maintaining a window and updating it as new data arrives.
- Video Streaming
	- process the video data in small windows, which can improve the efficiency of your video streaming algorithms
- Network and traffic monitoring
	- Detecting patterns or anomalies in network traffic by sliding through packets or connections.
- Stock Price Movements
	- Analyzing a moving window of stock prices to identify trends or patterns.
- DNA Sequence Analysis
	- Identifying specific sequences or patterns in DNA by sliding through the sequence data.


#### Citations: 
[^1][Ryan Schachte: *Sliding Window Technique - Algorithmic Mental Models*](https://www.youtube.com/watch?v=MK-NZ4hN7rs&t=1163s)

[^2][GeeksforGeeks: *Definition for Sliding Window*](https://www.geeksforgeeks.org/window-sliding-technique/)

[^3][Stack Overflow: *Auxiliary Data Structures*](https://stackoverflow.com/questions/48615697/what-are-auxiliary-data-structures#:~:text=Auxiliary%20data%20structure%20is%20a,by%20using%20a%20hash%20table.)


[^4][Scaler: *Sliding Window Algorithm*](https://www.scaler.com/topics/sliding-window-algorithm/)

[5^][Math.min()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)

[6^][Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

[^7][Powerpoint Images](https://unsplash.com/photos/macbook-pro-inside-gray-room-B3l0g6HLxr8?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash)

[^8][Medium: *Introduction to Sliding Window*](https://medium.com/aiskunks/introduction-to-sliding-window-algorithm-5eb9a26fd078)

[^9][chatGPT: *Validating Question Example and Rephrasing*](https://chat.openai.com/share/a75d1773-bc9c-42bb-ad0b-7681974ce2fe)

[^10][chatGPT: *Real-Life Scenarios using Sliding Window*](https://chat.openai.com/share/98b67a08-8d96-4d13-b196-f3914f25c097)

[^11][chatGPT: *Creating Visual Blocks and Verifying Time complexity*](https://chat.openai.com/share/c747cc16-503f-4574-9db9-f00d452fe0d6)

[^12][chatGPT: *Edge Cases for Sliding Window*](https://chat.openai.com/share/f406da63-931b-499a-b935-1d100c9e4fc5)

[^13][chatGPT: *Time Complexity*](https://chat.openai.com/share/c24a2604-9869-4f2c-9738-96af83fc809d)