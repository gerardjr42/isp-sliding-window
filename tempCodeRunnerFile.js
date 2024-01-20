 * Find the subarray containing the 3 people with the highest sum. Return the position of those people.*
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
