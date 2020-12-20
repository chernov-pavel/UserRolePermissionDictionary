package org.lr2.adminRolePermissions.exceptions;

public class BusinessLogicException extends Exception {
    public BusinessLogicException(ErrorCode errorCode) {
        super(ErrorProvider.getMessage(errorCode));
    }
}
