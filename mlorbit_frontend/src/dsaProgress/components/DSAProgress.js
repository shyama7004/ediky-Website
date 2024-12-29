// DSAProgress.jsx
import React, { useState, useEffect, useRef } from "react";
import "../dsaProgress.css";
const lectures = [
    // LECTURE 1 - 8 (no topics/questions)
    {
        title: "Lecture 1",
        url: "https://www.youtube.com/watch?v=WQoB2z67hvY&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=1&t=2s",
        videoEmbed: "https://www.youtube.com/embed/WQoB2z67hvY",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 2",
        url: "https://www.youtube.com/watch?v=t6zLJOCVqD0&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=2",
        videoEmbed: "https://www.youtube.com/embed/t6zLJOCVqD0",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 3",
        url: "https://www.youtube.com/watch?v=WR31ByTzAVQ&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=3",
        videoEmbed: "https://www.youtube.com/embed/WR31ByTzAVQ",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 4",
        url: "https://www.youtube.com/watch?v=dr-pLeJBr38&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=4",
        videoEmbed: "https://www.youtube.com/embed/dr-pLeJBr38",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 5",
        url: "https://www.youtube.com/watch?v=yjdQHb2elqI&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=5",
        videoEmbed: "https://www.youtube.com/embed/yjdQHb2elqI",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 6",
        url: "https://www.youtube.com/watch?v=bWrsk0QizEk&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=6",
        videoEmbed: "https://www.youtube.com/embed/bWrsk0QizEk",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 7",
        url: "https://www.youtube.com/watch?v=0fwrMYPcGQ0&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=7",
        videoEmbed: "https://www.youtube.com/embed/0fwrMYPcGQ0",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 8",
        url: "https://www.youtube.com/watch?v=8nNqk2NPbRA&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=8",
        videoEmbed: "https://www.youtube.com/embed/8nNqk2NPbRA",
        topics: [],
        questions: [],
    },
    // LECTURE 9
    {
        title: "Lecture 9",
        url: "https://www.youtube.com/watch?v=sNrLlmOIn-c&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=9",
        videoEmbed: "https://www.youtube.com/embed/sNrLlmOIn-c",
        topics: ["Array", "Dynamic Programming", "Prefix Sum", "Divide & Conquer"],
        questions: [
            {
                label: "LeetCode 121 - Best Time to Buy and Sell Stock",
                url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            },
            {
                label: "LeetCode 53 - Maximum Subarray",
                url: "https://leetcode.com/problems/maximum-subarray/",
            },
            {
                label: "LeetCode 123 - Best Time to Buy and Sell Stock III",
                url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
            },
            {
                label: "LeetCode 188 - Best Time to Buy and Sell Stock IV",
                url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
            },
            {
                label: "LeetCode 238 - Product of Array Except Self",
                url: "https://leetcode.com/problems/product-of-array-except-self/",
            },
        ],
    },
    // LECTURE 10
    {
        title: "Lecture 10",
        url: "https://www.youtube.com/watch?v=oVa8DfUDKTw&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=10",
        videoEmbed: "https://www.youtube.com/embed/oVa8DfUDKTw",
        topics: ["Array", "Hash Table", "Prefix Sum"],
        questions: [
            {
                label: "LeetCode 1207 - Unique Number of Occurrences",
                url: "https://leetcode.com/problems/unique-number-of-occurrences/",
            },
            {
                label: "LeetCode 442 - Find All Duplicates in an Array",
                url: "https://leetcode.com/problems/find-all-duplicates-in-an-array/",
            },
            {
                label: "LeetCode 448 - Find All Numbers Disappeared in an Array",
                url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
            },
            {
                label: "LeetCode 2615 - Sum of Distances",
                url: "https://leetcode.com/problems/sum-of-distances/",
            },
            {
                label:
                    "LeetCode 1959 - Minimum Total Space Wasted with k Resizing Operations",
                url: "https://leetcode.com/problems/minimum-total-space-wasted-with-k-resizing-operations/description/",
            },
        ],
    },
    // LECTURE 11
    {
        title: "Lecture 11",
        url: "https://www.youtube.com/watch?v=QovOdd80A4s&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=11",
        videoEmbed: "https://www.youtube.com/embed/QovOdd80A4s",
        topics: ["Array", "Hash Table"],
        questions: [
            {
                label: "LeetCode 1 - Two Sum",
                url: "https://leetcode.com/problems/two-sum/",
            },
        ],
    },
    // LECTURE 12
    {
        title: "Lecture 12",
        url: "https://www.youtube.com/watch?v=YJeoQBevNVo&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=12",
        videoEmbed: "https://www.youtube.com/embed/YJeoQBevNVo",
        topics: [
            "Array",
            "Prefix Sum",
            "Hash Table",
            "Binary Search",
            "Interactive",
            "Dynamic Programming",
            "Greedy",
        ],
        questions: [
            {
                label: "LeetCode 724 - Find Pivot Index",
                url: "https://leetcode.com/problems/find-pivot-index/",
            },
            {
                label: "LeetCode 560 - Subarray Sum Equals K",
                url: "https://leetcode.com/problems/subarray-sum-equals-k/",
            },
            {
                label: "LeetCode 2270 - Number of Ways to Split Array",
                url: "https://leetcode.com/problems/number-of-ways-to-split-array/",
            },
            {
                label: "LeetCode 2574 - Left and Right Sum Differences",
                url: "https://leetcode.com/problems/left-and-right-sum-differences/",
            },
            {
                label: "LeetCode 852 - Peak Index in a Mountain Array",
                url: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
            },
            {
                label: "LeetCode 162 - Find Peak Element",
                url: "https://leetcode.com/problems/find-peak-element/",
            },
            {
                label: "LeetCode 1095 - Find in Mountain Array",
                url: "https://leetcode.com/problems/find-in-mountain-array/",
            },
            {
                label:
                    "LeetCode 1671 - Minimum Number of Removals to Make Mountain Array",
                url: "https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/",
            },
        ],
    },
    // LECTURE 13 - 59 (no special topics unless in original text)
    {
        title: "Lecture 13",
        url: "https://www.youtube.com/watch?v=zD2Jg3alZV8&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=13",
        videoEmbed: "https://www.youtube.com/embed/zD2Jg3alZV8",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 14",
        url: "https://www.youtube.com/watch?v=6z2HK4o8qcU&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=14",
        videoEmbed: "https://www.youtube.com/embed/6z2HK4o8qcU",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 15",
        url: "https://www.youtube.com/watch?v=YTTdLgyqOLY&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=15",
        videoEmbed: "https://www.youtube.com/embed/YTTdLgyqOLY",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 16",
        url: "https://www.youtube.com/watch?v=UdO2NeHB46c&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=16",
        videoEmbed: "https://www.youtube.com/embed/UdO2NeHB46c",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 17",
        url: "https://www.youtube.com/watch?v=zOhUavxlzw4&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=18",
        videoEmbed: "https://www.youtube.com/embed/zOhUavxlzw4",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 18",
        url: "https://www.youtube.com/watch?v=7kIVfVY6Axk&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=19",
        videoEmbed: "https://www.youtube.com/embed/7kIVfVY6Axk",
        topics: [],
        questions: [],
    },
    // LECTURE 19
    {
        title: "Lecture 19",
        url: "https://www.youtube.com/watch?v=WgMPrLX-zsA&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=20",
        videoEmbed: "https://www.youtube.com/embed/WgMPrLX-zsA",
        topics: ["Sort (Will be covered in next Lectures)"],
        questions: [],
    },
    // LECTURE 20
    {
        title: "Lecture 20",
        url: "https://www.youtube.com/watch?v=MPvr-LmaZmA&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=21",
        videoEmbed: "https://www.youtube.com/embed/MPvr-LmaZmA",
        topics: ["Array", "Two Pointers", "Sorting", "Simulation"],
        questions: [
            {
                label: "LeetCode 88 - Merge Sorted Array",
                url: "https://leetcode.com/problems/merge-sorted-array/",
            },
            {
                label: "LeetCode 977 - Squares of a Sorted Array",
                url: "https://leetcode.com/problems/squares-of-a-sorted-array/",
            },
            {
                label: "LeetCode 986 - Interval List Intersections",
                url: "https://leetcode.com/problems/interval-list-intersections/",
            },
            {
                label: "LeetCode 283 - Move Zeroes",
                url: "https://leetcode.com/problems/move-zeroes/",
            },
            {
                label: "LeetCode 2460 - Apply Operations to an Array",
                url: "https://leetcode.com/problems/apply-operations-to-an-array/",
            },
            {
                label: "LeetCode 27 - Remove Element",
                url: "https://leetcode.com/problems/remove-element/",
            },
        ],
    },
    // LECTURE 21
    {
        title: "Lecture 21",
        url: "https://www.youtube.com/watch?v=Z7_nMTHROZo&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=22",
        videoEmbed: "https://www.youtube.com/embed/Z7_nMTHROZo",
        topics: [
            "Array",
            "Math",
            "Two Pointers",
            "Sorting",
            "Number Theory",
            "String",
        ],
        questions: [
            {
                label: "LeetCode 189 - Rotate Array",
                url: "https://leetcode.com/problems/rotate-array/",
            },
            {
                label: "LeetCode 2607 - Make K-Subarray Sums Equal",
                url: "https://leetcode.com/problems/make-k-subarray-sums-equal/",
            },
            {
                label: "LeetCode 1752 - Check if Array Is Sorted and Rotated",
                url: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
            },
            {
                label: "LeetCode 2124 - Check if All A's Appear Before All B's",
                url: "https://leetcode.com/problems/check-if-all-as-appear-before-all-bs/",
            },
        ],
    },
    // LECTURE 22
    {
        title: "Lecture 22",
        url: "https://www.youtube.com/watch?v=Wdjr6uoZ0e0&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=24",
        videoEmbed: "https://www.youtube.com/embed/Wdjr6uoZ0e0",
        topics: [
            "Two Pointers",
            "String",
            "Math",
            "Array",
            "Brainteaser",
            "Enumeration",
            "Greedy",
            "Dynamic Programming",
            "Backtracking",
            "Bit Manipulation",
            "Bitmask",
            "Rolling Hash",
            "String Matching",
            "Hash Function",
            "Sliding Window",
            "Hash Table",
            "Stack",
            "Simulation",
        ],
        questions: [
            {
                label: "LeetCode 344 - Reverse String",
                url: "https://leetcode.com/problems/reverse-string/",
            },
            {
                label: "LeetCode 345 - Reverse Vowels of a String",
                url: "https://leetcode.com/problems/reverse-vowels-of-a-string/",
            },
            {
                label: "LeetCode 541 - Reverse String II",
                url: "https://leetcode.com/problems/reverse-string-ii/",
            },
            {
                label: "LeetCode 9 - Palindrome Number",
                url: "https://leetcode.com/problems/palindrome-number/",
            },
            {
                label: "LeetCode 2217 - Find Palindrome With Fixed Length",
                url: "https://leetcode.com/problems/find-palindrome-with-fixed-length/",
            },
            {
                label: "LeetCode 2396 - Strictly Palindromic Number",
                url: "https://leetcode.com/problems/strictly-palindromic-number/",
            },
            {
                label: "LeetCode 2843 - Count Symmetric Integers",
                url: "https://leetcode.com/problems/count-symmetric-integers/",
            },
            {
                label: "LeetCode 125 - Valid Palindrome",
                url: "https://leetcode.com/problems/valid-palindrome/",
            },
            {
                label: "LeetCode 680 - Valid Palindrome II",
                url: "https://leetcode.com/problems/valid-palindrome-ii/",
            },
            {
                label: "LeetCode 2108 - Find First Palindromic String in the Array",
                url: "https://leetcode.com/problems/find-first-palindromic-string-in-the-array/",
            },
            {
                label:
                    "LeetCode 2002 - Maximum Product of the Length of Two Palindromic Subsequences",
                url: "https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences/",
            },
            {
                label: "LeetCode 1910 - Remove All Occurrences of a Substring",
                url: "https://leetcode.com/problems/remove-all-occurrences-of-a-substring/",
            },
            {
                label: "LeetCode 2430 - Maximum Deletions on a String",
                url: "https://leetcode.com/problems/maximum-deletions-on-a-string/",
            },
            {
                label: "LeetCode 214 - Shortest Palindrome",
                url: "https://leetcode.com/problems/shortest-palindrome/",
            },
            {
                label: "LeetCode 1392 - Longest Happy Prefix",
                url: "https://leetcode.com/problems/longest-happy-prefix/",
            },
            {
                label: "LeetCode 567 - Permutation in String",
                url: "https://leetcode.com/problems/permutation-in-string/",
            },
            {
                label: "LeetCode 438 - Find All Anagrams in a String",
                url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
            },
            {
                label: "LeetCode 76 - Minimum Window Substring",
                url: "https://leetcode.com/problems/minimum-window-substring/",
            },
            {
                label:
                    "LeetCode 1047 - Remove All Adjacent Duplicates In String",
                url: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
            },
            {
                label:
                    "LeetCode 1209 - Remove All Adjacent Duplicates in String II",
                url: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/",
            },
            {
                label: "LeetCode 2390 - Removing Stars From a String",
                url: "https://leetcode.com/problems/removing-stars-from-a-string/",
            },
            {
                label: "LeetCode 2716 - Minimize String Length",
                url: "https://leetcode.com/problems/minimize-string-length/",
            },
        ],
    },
    // LECTURE 23
    {
        title: "Lecture 23",
        url: "https://www.youtube.com/watch?v=1CdolnvxLs0&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=25",
        videoEmbed: "https://www.youtube.com/embed/1CdolnvxLs0",
        topics: [
            "Array",
            "Math",
            "Matrix",
            "Binary Search",
            "Divide and Conquer",
            "String",
        ],
        questions: [
            {
                label: "LeetCode 48 - Rotate Image",
                url: "https://leetcode.com/problems/rotate-image/",
            },
            {
                label:
                    "LeetCode 1886 - Determine Whether Matrix Can Be Obtained By Rotation",
                url: "https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/",
            },
            {
                label: "LeetCode 74 - Search a 2D Matrix",
                url: "https://leetcode.com/problems/search-a-2d-matrix/",
            },
            {
                label: "LeetCode 240 - Search a 2D Matrix II",
                url: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
            },
            {
                label:
                    "LeetCode 2468 - Split Message Based on Limit",
                url: "https://leetcode.com/problems/split-message-based-on-limit/",
            },
        ],
    },
    // LECTURE 24
    {
        title: "Lecture 24",
        url: "https://www.youtube.com/watch?v=KdePjukNs98&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=26",
        videoEmbed: "https://www.youtube.com/embed/KdePjukNs98",
        topics: [
            "Array",
            "Math",
            "Enumeration",
            "Number Theory",
            "Dynamic Programming",
            "Breadth-First Search",
            "Hash Table",
            "Heap (Priority Queue)",
        ],
        questions: [
            {
                label: "LeetCode 204 - Count Primes",
                url: "https://leetcode.com/problems/count-primes/",
            },
            {
                label: "LeetCode 279 - Perfect Squares",
                url: "https://leetcode.com/problems/perfect-squares/",
            },
            {
                label: "LeetCode 263 - Ugly Number",
                url: "https://leetcode.com/problems/ugly-number/",
            },
            {
                label: "LeetCode 264 - Ugly Number II",
                url: "https://leetcode.com/problems/ugly-number-ii/",
            },
            {
                label: "LeetCode 2427 - Number of Common Factors",
                url: "https://leetcode.com/problems/number-of-common-factors/",
            },
            {
                label:
                    "LeetCode 2761 - Prime Pairs With Target Sum",
                url: "https://leetcode.com/problems/prime-pairs-with-target-sum/",
            },
        ],
    },
    // LECTURE 25 - 59 (no special topics unless in original text)
    {
        title: "Lecture 25",
        url: "https://www.youtube.com/watch?v=YHwEIfrXZgE&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=28",
        videoEmbed: "https://www.youtube.com/embed/YHwEIfrXZgE",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 26",
        url: "https://www.youtube.com/watch?v=rlpw7oi-bpE&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=29",
        videoEmbed: "https://www.youtube.com/embed/rlpw7oi-bpE",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 27",
        url: "https://www.youtube.com/watch?v=P0UsAxtXq2Y&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=30",
        videoEmbed: "https://www.youtube.com/embed/P0UsAxtXq2Y",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 28",
        url: "https://www.youtube.com/watch?v=MMO2c57XHzM&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=31",
        videoEmbed: "https://www.youtube.com/embed/MMO2c57XHzM",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 29",
        url: "https://www.youtube.com/watch?v=LlqgWQgm58g&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=32",
        videoEmbed: "https://www.youtube.com/embed/LlqgWQgm58g",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 30",
        url: "https://www.youtube.com/watch?v=0TEvaAiqo8Y&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=33",
        videoEmbed: "https://www.youtube.com/embed/0TEvaAiqo8Y",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 31",
        url: "https://www.youtube.com/watch?v=_-2u4EPHD88&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=34",
        videoEmbed: "https://www.youtube.com/embed/_-2u4EPHD88",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 32",
        url: "https://www.youtube.com/watch?v=zg8Y1oE4qYQ&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=35",
        videoEmbed: "https://www.youtube.com/embed/zg8Y1oE4qYQ",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 33",
        url: "https://www.youtube.com/watch?v=UntSI7G5h20&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=36",
        videoEmbed: "https://www.youtube.com/embed/UntSI7G5h20",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 34",
        url: "https://www.youtube.com/watch?v=WyY2Af3k1xI&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=37",
        videoEmbed: "https://www.youtube.com/embed/WyY2Af3k1xI",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 35",
        url: "https://www.youtube.com/watch?v=cdHEpbBVjRM&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=38",
        videoEmbed: "https://www.youtube.com/embed/cdHEpbBVjRM",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 36",
        url: "https://www.youtube.com/watch?v=sNaHN4tZmRk&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=40",
        videoEmbed: "https://www.youtube.com/embed/sNaHN4tZmRk",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 37",
        url: "https://www.youtube.com/watch?v=V0IgCltYgg4&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=41",
        videoEmbed: "https://www.youtube.com/embed/V0IgCltYgg4",
        topics: [],
        questions: [
            {
                label: "Subsets (#78)",
                url: "https://leetcode.com/problems/subsets/",
            },
            {
                label: "Subsets II (#90)",
                url: "https://leetcode.com/problems/subsets-ii/",
            },
            {
                label: "Letter Case Permutation (#784)",
                url: "https://leetcode.com/problems/letter-case-permutation/",
            },
            {
                label:
                    "The Number of Passengers in Each Bus I (#1982)",
                url: "https://leetcode.com/problems/the-number-of-passengers-in-each-bus-i/",
            },
            {
                label:
                    "The Number of Good Subsets (#2044)",
                url: "https://leetcode.com/problems/the-number-of-good-subsets/",
            },
        ],
    },
    {
        title: "Lecture 38",
        url: "https://www.youtube.com/watch?v=tWnHbSHwNmA&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=42",
        videoEmbed: "https://www.youtube.com/embed/tWnHbSHwNmA",
        topics: [],
        questions: [
            {
                label:
                    "Letter Combinations of a Phone Number (#17)",
                url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
            },
            {
                label: "Generate Parentheses (#22)",
                url: "https://leetcode.com/problems/generate-parentheses/",
            },
            {
                label: "Combination Sum (#39)",
                url: "https://leetcode.com/problems/combination-sum/",
            },
            {
                label: "Binary Watch (#401)",
                url: "https://leetcode.com/problems/binary-watch/",
            },
            {
                label:
                    "Count Nodes Equal to Sum of Descendants (#3014)",
                url: "https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants/",
            },
        ],
    },
    {
        title: "Lecture 39",
        url: "https://www.youtube.com/watch?v=va3NEycUxsg&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=43",
        videoEmbed: "https://www.youtube.com/embed/va3NEycUxsg",
        topics: [],
        questions: [
            {
                label: "Permutations (#46)",
                url: "https://leetcode.com/problems/permutations/",
            },
            {
                label: "Permutations II (#47)",
                url: "https://leetcode.com/problems/permutations-ii/",
            },
            {
                label: "Next Permutation (#31)",
                url: "https://leetcode.com/problems/next-permutation/",
            },
            {
                label: "Combinations (#77)",
                url: "https://leetcode.com/problems/combinations/",
            },
            {
                label: "Permutation Sequence (#60)",
                url: "https://leetcode.com/problems/permutation-sequence/",
            },
        ],
    },
    {
        title: "Lecture 40",
        url: "https://www.youtube.com/watch?v=GqtyVD-x_jY&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=44",
        videoEmbed: "https://www.youtube.com/embed/GqtyVD-x_jY",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 41",
        url: "https://www.youtube.com/watch?v=BYCeh76OASc&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=45",
        videoEmbed: "https://www.youtube.com/embed/BYCeh76OASc",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 42",
        url: "https://www.youtube.com/watch?v=i_5pvt7ag7E&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=46",
        videoEmbed: "https://www.youtube.com/embed/i_5pvt7ag7E",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 43",
        url: "https://www.youtube.com/watch?v=b3GccK5_KSQ&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=47",
        videoEmbed: "https://www.youtube.com/embed/b3GccK5_KSQ",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 44",
        url: "https://www.youtube.com/watch?v=q8gdBn9RPeI&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=48",
        videoEmbed: "https://www.youtube.com/embed/q8gdBn9RPeI",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 45",
        url: "https://www.youtube.com/watch?v=vqS1nVQdCJM&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=49",
        videoEmbed: "https://www.youtube.com/embed/vqS1nVQdCJM",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 46",
        url: "https://www.youtube.com/watch?v=fi2vh0nQLi0&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=51",
        videoEmbed: "https://www.youtube.com/embed/fi2vh0nQLi0",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 47",
        url: "https://www.youtube.com/watch?v=VxOFflTXlXo&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=52",
        videoEmbed: "https://www.youtube.com/embed/VxOFflTXlXo",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 48",
        url: "https://www.youtube.com/watch?v=7pgs-wT5d4c&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=53",
        videoEmbed: "https://www.youtube.com/embed/7pgs-wT5d4c",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 49",
        url: "https://www.youtube.com/watch?v=ogmBt6f9hw8&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=54",
        videoEmbed: "https://www.youtube.com/embed/ogmBt6f9hw8",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 50",
        url: "https://www.youtube.com/watch?v=aD7mBVnKFEU&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=55",
        videoEmbed: "https://www.youtube.com/embed/aD7mBVnKFEU",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 51",
        url: "https://www.youtube.com/watch?v=HiRlTPf9aCg&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=56",
        videoEmbed: "https://www.youtube.com/embed/HiRlTPf9aCg",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 52",
        url: "https://www.youtube.com/watch?v=83mPr0i56Gg&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=57",
        videoEmbed: "https://www.youtube.com/embed/83mPr0i56Gg",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 53",
        url: "https://www.youtube.com/watch?v=rM5EEA_rbNY&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=58",
        videoEmbed: "https://www.youtube.com/embed/rM5EEA_rbNY",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 54",
        url: "https://www.youtube.com/watch?v=_6COl6V6mng&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=59",
        videoEmbed: "https://www.youtube.com/embed/_6COl6V6mng",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 55",
        url: "https://www.youtube.com/watch?v=BmZnJehDzyU&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=60",
        videoEmbed: "https://www.youtube.com/embed/BmZnJehDzyU",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 56",
        url: "https://www.youtube.com/watch?v=lJLcqDsmYfg&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=61",
        videoEmbed: "https://www.youtube.com/embed/lJLcqDsmYfg",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 57",
        url: "https://www.youtube.com/watch?v=9u2BJfmWNEg&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=62",
        videoEmbed: "https://www.youtube.com/embed/9u2BJfmWNEg",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 58",
        url: "https://www.youtube.com/watch?v=lrSXKLmnMV8&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=63",
        videoEmbed: "https://www.youtube.com/embed/lrSXKLmnMV8",
        topics: [],
        questions: [],
    },
    {
        title: "Lecture 59",
        url: "https://www.youtube.com/watch?v=OpwYmEBcPh0&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&index=64",
        videoEmbed: "https://www.youtube.com/embed/OpwYmEBcPh0",
        topics: [],
        questions: [],
    },
];

// ADDITIONAL SECTIONS AFTER LECTURES
const additionalSections = [
    {
        sectionTitle: "Pointer",
        questions: [
            {
                label: "LeetCode 19 - Remove Nth Node From End of List",
                url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
            },
            {
                label: "LeetCode 206 - Reverse Linked List",
                url: "https://leetcode.com/problems/reverse-linked-list/",
            },
            {
                label: "LeetCode 21 - Merge Two Sorted Lists",
                url: "https://leetcode.com/problems/merge-two-sorted-lists/",
            },
            {
                label: "LeetCode 234 - Palindrome Linked List",
                url: "https://leetcode.com/problems/palindrome-linked-list/",
            },
            {
                label: "LeetCode 203 - Remove Linked List Elements",
                url: "https://leetcode.com/problems/remove-linked-list-elements/",
            },
            {
                label: "LeetCode 328 - Odd Even Linked List",
                url: "https://leetcode.com/problems/odd-even-linked-list/",
            },
            {
                label: "LeetCode 25 - Reverse Nodes in k-Group",
                url: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
            },
            {
                label: "LeetCode 24 - Swap Nodes in Pairs",
                url: "https://leetcode.com/problems/swap-nodes-in-pairs/",
            },
            {
                label: "LeetCode 61 - Rotate List",
                url: "https://leetcode.com/problems/rotate-list/",
            },
            {
                label: "LeetCode 2 - Add Two Numbers",
                url: "https://leetcode.com/problems/add-two-numbers/",
            },
            {
                label: "LeetCode 83 - Remove Duplicates from Sorted List",
                url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
            },
            {
                label: "LeetCode 82 - Remove Duplicates from Sorted List II",
                url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
            },
            {
                label: "LeetCode 430 - Flatten a Multilevel Doubly Linked List",
                url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
            },
            {
                label: "LeetCode 725 - Split Linked List in Parts",
                url: "https://leetcode.com/problems/split-linked-list-in-parts/",
            },
            {
                label: "LeetCode 143 - Reorder List",
                url: "https://leetcode.com/problems/reorder-list/",
            },
            {
                label: "LeetCode 148 - Reorder List",
                url: "https://leetcode.com/problems/reorder-list/",
            },
        ],
    },
    {
        sectionTitle: "More Arrays",
        questions: [
            {
                label: "LeetCode 238 - Product of Array Except Self",
                url: "https://leetcode.com/problems/product-of-array-except-self/",
            },
            {
                label: "LeetCode 153 - Find Minimum in Rotated Sorted Array",
                url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            },
            {
                label: "LeetCode 33 - Search in Rotated Sorted Array",
                url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
            },
            {
                label: "LeetCode 15 - 3Sum",
                url: "https://leetcode.com/problems/3sum/",
            },
            {
                label: "LeetCode 11 - Container With Most Water",
                url: "https://leetcode.com/problems/container-with-most-water/",
            },
            {
                label: "LeetCode 56 - Merge Intervals",
                url: "https://leetcode.com/problems/merge-intervals/",
            },
            {
                label: "LeetCode 57 - Insert Interval",
                url: "https://leetcode.com/problems/insert-interval/",
            },
            {
                label: "LeetCode 75 - Sort Colors",
                url: "https://leetcode.com/problems/sort-colors/",
            },
            {
                label: "LeetCode 54 - Spiral Matrix",
                url: "https://leetcode.com/problems/spiral-matrix/",
            },
            {
                label: "LeetCode 287 - Find the Duplicate Number",
                url: "https://leetcode.com/problems/find-the-duplicate-number/",
            },
            {
                label: "LeetCode 31 - Next Permutation",
                url: "https://leetcode.com/problems/next-permutation/",
            },
            {
                label: "LeetCode 26 - Remove Duplicates from Sorted Array",
                url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
            },
            {
                label: "LeetCode 27 - Sort List",
                url: "https://leetcode.com/problems/sort-list/description/",
            },
        ],
    },
    {
        sectionTitle: "Sorting",
        questions: [
            {
                label: "LeetCode 57 - Insert Interval",
                url: "https://leetcode.com/problems/insert-interval/",
            },
            {
                label: "LeetCode 905 - Sort Array By Parity",
                url: "https://leetcode.com/problems/sort-array-by-parity/",
            },
            {
                label: "LeetCode 179 - Largest Number",
                url: "https://leetcode.com/problems/largest-number/",
            },
            {
                label: "LeetCode 148 - Sort List",
                url: "https://leetcode.com/problems/sort-list/",
            },
            {
                label: "LeetCode 452 - Minimum Number of Arrows to Burst Balloons",
                url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
            },
            {
                label: "LeetCode 561 - Array Partition",
                url: "https://leetcode.com/problems/array-partition/",
            },
            {
                label: "LeetCode 274 - H-Index",
                url: "https://leetcode.com/problems/h-index/",
            },
            {
                label: "LeetCode 275 - H-Index II",
                url: "https://leetcode.com/problems/h-index-ii/",
            },
            {
                label: "LeetCode 324 - Wiggle Sort II",
                url: "https://leetcode.com/problems/wiggle-sort-ii/",
            },
        ],
    },
    {
        sectionTitle: "Recursion",
        questions: [
            {
                label: "LeetCode 39 - Combination Sum",
                url: "https://leetcode.com/problems/combination-sum/",
            },
            {
                label: "LeetCode 79 - Word Search",
                url: "https://leetcode.com/problems/word-search/",
            },
            {
                label: "LeetCode 980 - Unique Paths III",
                url: "https://leetcode.com/problems/unique-paths-iii/",
            },
            {
                label: "LeetCode 51 - N-Queens",
                url: "https://leetcode.com/problems/n-queens/",
            },
            {
                label: "LeetCode 779 - K-th Symbol in Grammar",
                url: "https://leetcode.com/problems/k-th-symbol-in-grammar/",
            },
        ],
    },
    {
        sectionTitle: "OOPS",
        questions: [
            {
                label: "LeetCode 1603 - Design Parking System",
                url: "https://leetcode.com/problems/design-parking-system/",
            },
            {
                label: "LeetCode 211 - Design Add and Search Words Data Structure",
                url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
            },
        ],
    },
    {
        sectionTitle: "Linked List",
        questions: [
            {
                label: "LeetCode 203 - Remove Linked List Elements",
                url: "https://leetcode.com/problems/remove-linked-list-elements/",
            },
            {
                label: "LeetCode 237 - Delete Node in a Linked List",
                url: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
            },
            {
                label: "LeetCode 2 - Add Two Numbers",
                url: "https://leetcode.com/problems/add-two-numbers/",
            },
            {
                label: "LeetCode 61 - Rotate List",
                url: "https://leetcode.com/problems/rotate-list/",
            },
            {
                label: "LeetCode 148 - Sort List",
                url: "https://leetcode.com/problems/sort-list/",
            },
            {
                label: "LeetCode 430 - Flatten a Multilevel Doubly Linked List",
                url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
            },
            {
                label: "LeetCode 1721 - Swapping Nodes in a Linked List",
                url: "https://leetcode.com/problems/swapping-nodes-in-a-linked-list/",
            },
            {
                label: "LeetCode 86 - Partition List",
                url: "https://leetcode.com/problems/partition-list/",
            },
            {
                label: "LeetCode 25 - Reverse Nodes in k-Group",
                url: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
            },
            {
                label: "LeetCode 707 - Design Linked List",
                url: "https://leetcode.com/problems/design-linked-list/",
            },
            {
                label: "LeetCode 430 - Flatten a Multilevel Doubly Linked List",
                url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
            },
            {
                label: "LeetCode 1669 - Merge In Between Linked Lists",
                url: "https://leetcode.com/problems/merge-in-between-linked-lists/",
            },
            {
                label: "LeetCode 147 - Insertion Sort List",
                url: "https://leetcode.com/problems/insertion-sort-list/",
            },
            {
                label: "LeetCode 2363 - Merge Similar Items",
                url: "https://leetcode.com/problems/merge-similar-items/",
            },
            {
                label: "LeetCode 2516 - Take K of Each Character From Left and Right",
                url: "https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/",
            },
            {
                label: "LeetCode 2095 - Delete the Middle Node of a Linked List",
                url: "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
            },
            {
                label: "LeetCode 876 - Middle of the Linked List",
                url: "https://leetcode.com/problems/middle-of-the-linked-list/",
            },
            {
                label: "LeetCode 1171 - Remove Zero Sum Consecutive Nodes from Linked List",
                url: "https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/",
            },
            {
                label: "LeetCode 2807 - Insert Greatest Common Divisors in Linked List",
                url: "https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/",
            },
        ],
    },
];

const DSAProgress = () => {
    const [expandedLecture, setExpandedLecture] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const searchInputRef = useRef(null);

    // Initialize completedLectures from localStorage directly
    const [completedLectures, setCompletedLectures] = useState(() => {
        if (typeof window !== "undefined") { // Ensure window is defined
            const storedCompleted = localStorage.getItem("completedLectures");
            return storedCompleted ? JSON.parse(storedCompleted) : [];
        }
        return [];
    });

    // Save completed lectures to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== "undefined") { // Ensure window is defined
            localStorage.setItem("completedLectures", JSON.stringify(completedLectures));
        }
    }, [completedLectures]);

    // Handler to toggle lecture expansion
    const toggleLecture = (index) => {
        setExpandedLecture((prev) => (prev === index ? null : index));
    };

    // Handler to toggle lecture completion
    const toggleCompletion = (lectureTitle) => {
        setCompletedLectures((prev) =>
            prev.includes(lectureTitle)
                ? prev.filter((title) => title !== lectureTitle)
                : [...prev, lectureTitle]
        );
    };

    const [selectedTopic, setSelectedTopic] = useState("");
    const allTopics = Array.from(new Set(lectures.flatMap((lecture) => lecture.topics)));

    // Filter lectures based on search term and selected topic
    const filteredLectures = lectures.filter(
        (lecture) =>
            lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedTopic === "" || lecture.topics.includes(selectedTopic))
    );

    const totalLectures = lectures.length;
    const completedCount = completedLectures.length;
    const progress = Math.round((completedCount / totalLectures) * 100);

    return (
        <div className="dsa-progress-container">
            {/* Embedded CSS remains unchanged */}
            <style>{`
                /* Dark-mode-friendly root variables */
                :root {
                  --background-color: #121212;
                  --card-bg: #1e1e1e;
                  --border-color: #333;
                  --header-bg: #222;
                  --text-color: #ddd;
                  --accent-color: #0d81ff;
                  --accent-color-hover: #0a66cc;
                  --completed-text-color: #888;
                }
    
                /* Global body styling */
                body {
                  background-color: var(--background-color);
                  margin: 0;
                  font-family: Arial, sans-serif;
                }
    
                /* Container for the entire DSA Progress component */
                .dsa-progress-container {
                  max-width: 900px;
                  margin: 0 auto;
                  padding: 1rem;
                  color: var(--text-color);
                }
    
                /* Page Title */
                .dsa-title {
                  text-align: center;
                  font-size: 2rem;
                  margin-bottom: 2rem;
                }
    
                /* Search Bar */
                .search-container {
                  display: flex;
                  justify-content: center;
                  margin-bottom: 1.5rem;
                }
    
                .search-container input {
                  width: 300px;
                  padding: 0.5rem;
                  border: 1px solid var(--border-color);
                  border-radius: 4px 0 0 4px;
                  background-color: var(--card-bg);
                  color: var(--text-color);
                  outline: none;
                }
    
                /* Removed Search Button for real-time search */
    
                /* Progress Bar Container */
                .progress-bar-container {
                  background-color: var(--border-color);
                  border-radius: 4px;
                  margin: 1rem 0;
                  height: 25px;
                  overflow: hidden;
                }
    
                .progress-bar {
                  background-color: var(--accent-color);
                  height: 100%;
                  text-align: center;
                  color: #fff;
                  line-height: 25px;
                  transition: width 0.4s ease;
                }
    
                /* Lecture Cards */
                .dsa-lecture {
                  background-color: var(--card-bg);
                  margin-bottom: 1rem;
                  border: 1px solid var(--border-color);
                  border-radius: 6px;
                  overflow: hidden;
                  transition: transform 0.2s;
                }
    
                .dsa-lecture:hover {
                  transform: scale(1.01);
                }
    
                .dsa-lecture.completed {
                  opacity: 0.7;
                }
    
                .dsa-lecture-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  cursor: pointer;
                  background-color: var(--header-bg);
                  padding: 0.75rem 1rem;
                  user-select: none;
                }
    
                .dsa-lecture-header h2 {
                  margin: 0;
                  font-size: 1.2rem;
                  color: var(--text-color);
                  display: flex;
                  align-items: center;
                }
    
                .dsa-lecture-header h2.completed {
                  color: var(--completed-text-color);
                  text-decoration: line-through;
                }
    
                .dsa-lecture-header span {
                  font-size: 1.5rem;
                  font-weight: bold;
                  color: var(--text-color);
                }
    
                .dsa-lecture-content {
                  padding: 1rem;
                  background-color: var(--card-bg);
                  animation: fadeIn 0.3s ease-in-out;
                }
    
                .lecture-video {
                  width: 100%;
                  height: 380px;
                  margin-bottom: 1rem;
                  border: none;
                  border-radius: 4px;
                }
    
                .dsa-lecture-content h3 {
                  margin-top: 1rem;
                  margin-bottom: 0.5rem;
                  font-size: 1.1rem;
                  color: var(--text-color);
                }
    
                .topics-list,
                .questions-list {
                  list-style: none;
                  padding-left: 0;
                  margin-bottom: 1rem;
                }
    
                .topics-list li,
                .questions-list li {
                  margin-bottom: 0.4rem;
                }
    
                .questions-list li a {
                  color: var(--accent-color);
                  text-decoration: none;
                }
    
                .questions-list li a:hover {
                  text-decoration: underline;
                }
    
                /* Additional Sections */
                .additional-section {
                  margin-top: 2rem;
                  padding: 1rem;
                  border: 1px solid var(--border-color);
                  border-radius: 6px;
                  background-color: var(--card-bg);
                }
    
                .additional-section h2 {
                  margin-top: 0;
                  color: var(--text-color);
                }
    
                .additional-section ul {
                  list-style: disc;
                  margin-left: 1.5rem;
                }
    
                .additional-section ul li {
                  margin-bottom: 0.3rem;
                }
    
                .additional-section ul li a {
                  color: var(--accent-color);
                  text-decoration: none;
                }
    
                .additional-section ul li a:hover {
                  text-decoration: underline;
                }
    
                /* Completed Lecture Checkbox */
                .completed-checkbox {
                  margin-right: 0.5rem;
                  transform: scale(1.2);
                  cursor: pointer;
                }
    
                /* Fade In Animation */
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
    
                /* Responsive Design */
                @media (max-width: 768px) {
                  .lecture-video {
                    height: 250px;
                  }
    
                  .search-container input {
                    width: 200px;
                  }
                }
            `}</style>
    
            {/* Progress Bar */}
            <div className="progress-bar-container" aria-label="Progress Bar">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    role="progressbar"
                >
                    {progress}%
                </div>
            </div>
            <p style={{ textAlign: "center" }}>
                {completedCount} out of {totalLectures} lectures completed
            </p>
    
            {/* Topic Filter */}
            <div className="topic-filter" style={{ marginBottom: "1rem" }}>
                <label htmlFor="topic-dropdown" style={{ marginRight: "1rem" }}>
                    Filter by Topic:
                </label>
                <select
                    id="topic-dropdown"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                >
                    <option value="">All Topics</option>
                    {allTopics.map((topic, index) => (
                        <option key={index} value={topic}>
                            {topic}
                        </option>
                    ))}
                </select>
            </div>
    
            {/* Search Box */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search lectures..."
                    ref={searchInputRef}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search lectures"
                />
                {/* Removed Search Button for real-time search */}
            </div>
    
            {/* Title */}
            <h1 className="dsa-title">DSA Progress</h1>
    
            {/* Filtered Lectures */}
            {filteredLectures.map((lecture, index) => (
                <div
                    key={index}
                    className={`dsa-lecture ${completedLectures.includes(lecture.title) ? "completed" : ""}`}
                >
                    <div
                        className={`dsa-lecture-header ${completedLectures.includes(lecture.title) ? "completed" : ""}`}
                        onClick={() => toggleLecture(index)}
                        aria-expanded={expandedLecture === index}
                    >
                        <h2>
                            <input
                                type="checkbox"
                                className="completed-checkbox"
                                checked={completedLectures.includes(lecture.title)}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    toggleCompletion(lecture.title);
                                }}
                                aria-label={`Mark ${lecture.title} as completed`}
                            />
                            {lecture.title}
                        </h2>
                        <span>{expandedLecture === index ? "–" : "+"}</span>
                    </div>
    
                    {expandedLecture === index && (
                        <div className="dsa-lecture-content">
                            <iframe
                                src={lecture.videoEmbed}
                                title={lecture.title}
                                className="lecture-video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
    
                            {lecture.topics.length > 0 && <h3>Topics Covered:</h3>}
                            {lecture.topics.length > 0 && (
                                <ul className="topics-list">
                                    {lecture.topics.map((topic, idx) => (
                                        <li key={idx}>{topic}</li>
                                    ))}
                                </ul>
                            )}
    
                            {lecture.questions.length > 0 && <h3>LeetCode Questions:</h3>}
                            {lecture.questions.length > 0 && (
                                <ul className="questions-list">
                                    {lecture.questions.map((q, qIndex) => (
                                        <li key={qIndex}>
                                            <a href={q.url} target="_blank" rel="noopener noreferrer">
                                                {q.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            ))}
    
            {/* Additional Sections AFTER Lecture 59 */}
            <div className="additional-section">
                <h2>Additional Practice Questions</h2>
                <p>
                    <em>First do the lectures, then attempt these questions:</em>
                </p>
    
                {additionalSections.map((section, secIndex) => (
                    <div key={secIndex} style={{ marginBottom: "1.5rem" }}>
                        <h2>{section.sectionTitle}</h2>
                        <ul>
                            {section.questions.map((q, qIndex) => (
                                <li key={qIndex}>
                                    <a href={q.url} target="_blank" rel="noopener noreferrer">
                                        {q.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
    
            <p style={{ marginTop: "2rem", textAlign: "center" }}>
                <strong>Section made by shayma7004</strong>
            </p>
        </div>
    );
};

export default DSAProgress;
