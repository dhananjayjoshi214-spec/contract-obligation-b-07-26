from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from src.database.core import get_db
from src.users.service import (
    get_all_users,
    create_user,
    update_user,
    delete_user,
    update_user_status,
    get_activities,
    get_all_roles,
    create_role
)

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("", response_model=List[Dict[str, Any]])
def read_users(db: Session = Depends(get_db)):
    """Retrieve all users list for the User & Role Management Dashboard."""
    return get_all_users(db)

@router.post("", status_code=status.HTTP_201_CREATED)
def add_user(user_data: Dict[str, Any], db: Session = Depends(get_db)):
    """Create a new user entry."""
    return create_user(user_data, db)

@router.get("/activity", response_model=List[Dict[str, Any]])
def read_activities(db: Session = Depends(get_db)):
    """Retrieve recent user activities and security audit logs."""
    return get_activities(db)

@router.get("/roles", response_model=List[Dict[str, Any]])
def read_roles(db: Session = Depends(get_db)):
    """Retrieve all system defined roles."""
    return get_all_roles(db)

@router.post("/roles", status_code=status.HTTP_201_CREATED)
def add_role(role_data: Dict[str, Any], db: Session = Depends(get_db)):
    """Create a new role with assigned permissions."""
    return create_role(role_data, db)

@router.put("/{user_id}")
def modify_user(user_id: str, updates: Dict[str, Any], db: Session = Depends(get_db)):
    """Update user information."""
    updated = update_user(user_id, updates, db)
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return updated

@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def remove_user(user_id: str, db: Session = Depends(get_db)):
    """Delete a user record by ID."""
    success = delete_user(user_id, db)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully", "id": user_id}

@router.patch("/{user_id}/status", status_code=status.HTTP_200_OK)
def patch_user_status(user_id: str, status_data: Dict[str, Any], db: Session = Depends(get_db)):
    """Update active/inactive status for a user."""
    updated = update_user_status(user_id, status_data, db)
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return updated

