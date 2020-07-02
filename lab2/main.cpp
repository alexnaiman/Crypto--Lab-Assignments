#include <iostream>
#include <cmath>
#include <stdlib.h>

using namespace std;

/**
 * the Euclidean algorithm for greatest common divisors
 * @param a -> number
 * @param b -> number
 * @return the greatest common divisor
 */
unsigned int gcd(unsigned int a, unsigned int b)
{
    return b == 0 ? a : gcd(b, a % b);
}

/**
 * Exponentiation by squaring, taking the remainder (mod n) at intermediate stages. 
 * It is a divide-and-conquer algorithm based on the observation that 
 * e.g. a^10 = (a^5)^2 and a^11 = (a^5)^2 * a
 * @param a -> the base 
 * @param p -> the power(exponent)
 * @param n -> number with which we want to do the modulo
 */

unsigned int modexp(unsigned int a, unsigned int p, unsigned int n)
{
    unsigned long long b;
    switch (p)
    {
    case 0:
        return 1;
    case 1:
        return a % n;
    default:
        b = modexp(a, p / 2, n);
        b = (b * b) % n;
        if (p % 2 == 1)
            b = (b * a) % n;
        return b;
    }
}

/**
 * n is Carmichael if and only if it is composite and, for all a with 1 < a < n 
 * which are relatively prime to n, the congruence a^(n-1) = 1 (mod n) holds.
 * 
 * Let n ∈ N be odd composite.
 *  (i) If n is divisible by a perfect square different of 1, then n is not a
 *       Carmichael number.
 *  (ii) If n is square free (that is, it is not divisible by the square of
 *      any prime), then n is a Carmichael number ⇔ p − 1|n − 1 for every
 *      prime p|n.
 */
int isCarmichael(unsigned int n)
{
    int a, s;
    int factor_found = 0;
    if (n % 2 == 0)
        return 0;
    //else:
    s = sqrt(n);
    a = 2;
    while (a < n)
    {
        if (a > s && !factor_found)
        {
            return 0;
        }
        if (gcd(a, n) > 1)
        {
            factor_found = 1;
        }
        else
        {
            if (modexp(a, n - 1, n) != 1)
            {
                return 0;
            }
        }
        a++;
    }
    return 1; // anything that survives to here is a carmichael
}

int main(int argc, char *argv[])
{
    unsigned int n;
    long arg = strtol(argv[1], NULL, 10);

    for (n = 2; n < arg; n++)
    {
        if (isCarmichael(n))
            printf("%u\n", n);
    }
    return 0;
}