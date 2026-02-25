def success_response(data=None, message="Success"):
    return {
        "success": True,
        "data": data,
        "message": message
    }

def error_response(code: str, message: str):
    return {
        "success": False,
        "error": {
            "code": code,
            "message": message
        }
    }