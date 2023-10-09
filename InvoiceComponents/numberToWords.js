export default function numberToWords(num) {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine"
    ];
    const teens = [
      "",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen"
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety"
    ];
  
    if (num === 0) return "Zero";
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + " " + units[num % 10];
    if (num < 1000)
      return (
        units[Math.floor(num / 100)] + " Hundred " + numberToWords(num % 100)
      );
    if (num < 1000000)
      return (
        numberToWords(Math.floor(num / 1000)) +
        " Thousand " +
        numberToWords(num % 1000)
      );
    if (num < 1000000000)
      return (
        numberToWords(Math.floor(num / 1000000)) +
        " Million " +
        numberToWords(num % 1000000)
      );
    return "Number too large";
  }
  