package com.sweetshop.exception;

public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException(String message) {
        super(message);
    }
    
    public ResourceAlreadyExistsException(String resource, String identifier) {
        super(resource + " already exists with identifier: " + identifier);
    }
}
