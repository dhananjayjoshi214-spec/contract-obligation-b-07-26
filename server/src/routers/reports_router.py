from fastapi import APIRouter

router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"]
)


@router.get("/header")
def get_header():

    return {
        "user": {
            "name": "John Smith",
            "role": "System Administrator",
            "initials": "JS"
        },
        "notification_count": 5
    }