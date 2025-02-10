package com.vital.utils;

public class Counter {

    private static long counter = 0;

    public static String nextString(String prefix) {
        return prefix + "-" + nextString();
    }

    public static String nextString() {
        return String.format("%s", counter++);
    }

    public static Long nextLong(){
        return counter++;
    }
}
