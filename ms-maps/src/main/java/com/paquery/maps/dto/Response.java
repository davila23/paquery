package com.paquery.maps.dto;


public class Response<T> {


    private T data;

    private int code = 0;

    private String message = "";


    public static <T> Response create( T data) {
        return new Response(data);
    }

    public Response(T data) {
        this.data = data;
    }

    public Response(T data, int code, String message) {
        this.data = data;
        this.code = code;
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
