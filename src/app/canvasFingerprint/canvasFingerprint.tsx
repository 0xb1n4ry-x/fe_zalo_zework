// "use client"
//
// import React, { useEffect, useRef, useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Fingerprint } from 'lucide-react';
//
// // Utility function to convert string to UTF-8 byte array
// function stringToBytes(str) {
//     const bytes = [];
//     for (let i = 0; i < str.length; i++) {
//         const charCode = str.charCodeAt(i);
//         if (charCode < 0x80) {
//             bytes.push(charCode);
//         } else if (charCode < 0x800) {
//             bytes.push(0xc0 | (charCode >> 6),
//                 0x80 | (charCode & 0x3f));
//         } else if (charCode < 0xd800 || charCode >= 0xe000) {
//             bytes.push(0xe0 | (charCode >> 12),
//                 0x80 | ((charCode >> 6) & 0x3f),
//                 0x80 | (charCode & 0x3f));
//         } else {
//             // Handle surrogate pairs
//             i++;
//             const nextCode = str.charCodeAt(i);
//             const codePoint = 0x10000 + (((charCode & 0x3ff) << 10) | (nextCode & 0x3ff));
//             bytes.push(0xf0 | (codePoint >> 18),
//                 0x80 | ((codePoint >> 12) & 0x3f),
//                 0x80 | ((codePoint >> 6) & 0x3f),
//                 0x80 | (codePoint & 0x3f));
//         }
//     }
//     return bytes;
// }
//
// // Updated MD5 implementation that handles UTF-8 input
// function MD5(input) {
//     // Convert input to bytes if it's a string
//     const bytes = typeof input === 'string' ? stringToBytes(input) : input;
//
//     // Initialize variables
//     let a = 0x67452301;
//     let b = 0xefcdab89;
//     let c = 0x98badcfe;
//     let d = 0x10325476;
//
//     // Pre-computed constants
//     const k = new Int32Array([
//         0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
//         0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
//         0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
//         0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
//         0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
//         0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
//         0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
//         0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
//         0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
//         0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
//         0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
//         0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
//         0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
//         0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
//         0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
//         0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
//     ]);
//
//     // Process each 512-bit chunk
//     for (let i = 0; i < bytes.length; i += 64) {
//         const chunk = new Int32Array(16);
//
//         // Convert bytes to 32-bit words
//         for (let j = 0; j < 16; j++) {
//             chunk[j] = bytes[i + j*4] |
//                 (bytes[i + j*4 + 1] << 8) |
//                 (bytes[i + j*4 + 2] << 16) |
//                 (bytes[i + j*4 + 3] << 24);
//         }
//
//         // Store initial values
//         let aa = a;
//         let bb = b;
//         let cc = c;
//         let dd = d;
//
//         // Main loop
//         for (let j = 0; j < 64; j++) {
//             let f, g;
//
//             if (j < 16) {
//                 f = (b & c) | (~b & d);
//                 g = j;
//             } else if (j < 32) {
//                 f = (d & b) | (~d & c);
//                 g = (5 * j + 1) % 16;
//             } else if (j < 48) {
//                 f = b ^ c ^ d;
//                 g = (3 * j + 5) % 16;
//             } else {
//                 f = c ^ (b | ~d);
//                 g = (7 * j) % 16;
//             }
//
//             const temp = d;
//             d = c;
//             c = b;
//             b = b + ((a + f + k[j] + chunk[g]) << k[j] | (a + f + k[j] + chunk[g]) >>> (32 - k[j]));
//             a = temp;
//         }
//
//         // Add chunk to result
//         a = (a + aa) | 0;
//         b = (b + bb) | 0;
//         c = (c + cc) | 0;
//         d = (d + dd) | 0;
//     }
//
//     // Convert to hex string
//     const hex = (n) => {
//         return (n < 16 ? "0" : "") + n.toString(16);
//     };
//
//     return hex(a & 0xff) + hex((a >> 8) & 0xff) + hex((a >> 16) & 0xff) + hex((a >> 24) & 0xff) +
//         hex(b & 0xff) + hex((b >> 8) & 0xff) + hex((b >> 16) & 0xff) + hex((b >> 24) & 0xff) +
//         hex(c & 0xff) + hex((c >> 8) & 0xff) + hex((c >> 16) & 0xff) + hex((c >> 24) & 0xff) +
//         hex(d & 0xff) + hex((d >> 8) & 0xff) + hex((d >> 16) & 0xff) + hex((d >> 24) & 0xff);
// }
//
// export function EnhancedCanvasFingerprint() {
//
//     useEffect(() => {
//
//     }, []);
//
//     return (
//
//     );
// };
//
