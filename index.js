/**
 * Find the greatest sum of a subarray with a fixed length of 3.*
 *
 * @param {number[]} arr - The input array.
 * @param {number} k - The length of the subarray
 * @returns {number} - Subarray with greatest Sum
 */
function maxSumSubarray(arr, k) {
  let maxSum = -Infinity; // Initialize the maximum sum variable to the smallest possible value;
  let currentSum = 0; // Initialize the current sum variable to 0

  // Calculates the sum of the first window
  for (let i = 0; i < k; i++) {
    //Looping through the fixed window length
    currentSum += arr[i]; // Add each element in the initial window to currentSum
  }

  // Slide the window through the array
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    // Subtracts the element leaving the window and add the new element entering the window
    //arr[i - k]: the first element in window; needs to be removed
    //arr[i]: the next adjacent element to add to the window
    
    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
    //maxSum = Math.max(maxSum, currentSum);
    //The Math.max() static method returns the largest of the numbers given as input parameters, or -Infinity if there are no parameters.
    // Update maxSum with the maximum of its current value and the currentSum
  }

  return maxSum; // Return the final maximum sum
}
const arr = [3, 6, 5, 9, 3, 7, 3]; 
const k = 3;

console.log(maxSumSubarray(arr, k)); //Output: 20


/**
 * Finds the length of the smallest subarray with a sum greater than or equal to the target sum.
 * @param {number[]} array - The input array.
 * @param {number} targetSum - The target sum.
 * @returns {number} - The length of the smallest subarray with the target sum,
*/
function smallestSubArraySum(array, targetSum) {
  let minWindowLength = Infinity; //Start with highest value since we're looking for min
  let currentSum = 0; //Start the accumulator at 0
  let end = 0; //Start and end the window at 0
  //picture this as a caterpillar, the end is the tail
  
  //Iterate through the array
  //start is the current element at the start of the window
  for (let start = 0; start < array.length; start++) {``
    currentSum += arr[start]; 
    //Add current sliding window sum to variable
    //Picture this as a caterpillar, the start is the head
    
    /*
    for each iteration: check if the currentSum is 
    greater than the target sum;
    */
    while (currentSum >= targetSum) {
      //if it passes the above: It then updates the length of the sliding window
      //The Math.min(): returns the smallest of the numbers given as input parameters, or Infinity if there are no parameters.
      //Math.min() compares the minWindowLength to the current length of the subarray
      minWindowLength = Math.min(minWindowLength, start - end + 1);
      //What is start? The index of the current element in our subarray.
      //What is end? The index of the first element in our subarray.
      //Why + 1? Ensures we include the current element in the length.
      //Ex: If we have a subarray at index 0,1,2,3. We get the length by adding +1.
      //Ex: start = 0; end = 3...What's the length: 3 - 0 + 1 = 4 in Length
      // update currentSum by subtracting the element at the start, which was removed
      currentSum -= array[end];
      //Removes the element at end of window from currentSum    
      end++; 
      // Move the start index to the right, effectively shrinking the window
      //If start was at index 0, adds one and moves to index 1.
    }
  }
  return minWindowLength; //Returns the minimum length of Window that has a sum >= targetSum
}
const array = [3, 6, 5, 9, 3, 7, 3];
const targetSum = 8;
console.log(smallestSubArraySum(array, targetSum)); //1



//Question 3:
//Suppose our cohort went out to Brooklyn Bowl to have some drinks, enjoying live music, and of course some bowling. But, we want to make this fun. We decided 3 people will have to pay for the drinks but we can't decide who.

// We came to a proposition:
// 1. Participants are asked to choose a random number between 1 and 10.
// 2. Now, for every set of three consecutive participants, we calculate the sum of their chosen numbers.
// 3. The group of three with the highest sum is the one responsible for covering the bill
/**
//  * Find the subarray containing the 3 people with the highest sum. Return the position of those people.*
//  *
//  * @param {number[]} arr - The input array.
//  * @param {number} k - The length of the subarray
//  * @returns {number} - Subarray with greatest Sum
//  */
// function maxSumSubarrayWithPosition(arr, k) {
//   let maxSum = 0;
//   let currentSum = 0;

//   let startingPosition = 0;
//   let endPosition = k - 1;

//   for (let i = 0; i < k; i++) {
//     currentSum += arr[i];
//   }

//   for (let i = k; i < arr.length; i++) {
//     currentSum = currentSum - arr[i - k] + arr[i];

//     if (currentSum > maxSum) {
//       maxSum = currentSum;
//       startingPosition =  i - k + 2; //i - k + 1: Will get us the first Index, we have to add + 1 
//       endPosition = i + 1 // We add + 1 to start position from 1, not 0.
//     }
//   }
//   return {maxSum, startingPosition, endPosition}; //Return all three results
// }
// const arr1 = [3, 6, 5, 9, 3, 7, 3];
// const n = 3;

// console.log(maxSumSubarrayWithPosition(arr1, n)); // maxSum: 20; sP: 2, eP:4


