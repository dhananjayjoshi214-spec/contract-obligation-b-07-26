from sqlalchemy.orm import Session
from src.entities.user import User, Activity, Role
from typing import List, Dict, Any, Optional
import json

# Fallback initial data store if PostgreSQL database tables are empty
DEMO_USERS_DB = [
    { "id": 1, "first_name": "Sarah", "last_name": "Chen", "name": "Sarah Chen", "dept": "Legal", "role": "Legal Manager", "email": "sarah.chen@contractiq.com", "status": "Active", "is_active": True, "lastLogin": "Jun 3, 2024 9:14 AM", "initials": "SC" },
    { "id": 2, "first_name": "David", "last_name": "Park", "name": "David Park", "dept": "Compliance", "role": "Compliance Officer", "email": "david.park@contractiq.com", "status": "Active", "is_active": True, "lastLogin": "Jun 3, 2024 8:52 AM", "initials": "DP" },
    { "id": 3, "first_name": "Lisa", "last_name": "Torres", "name": "Lisa Torres", "dept": "Operations", "role": "Legal Manager", "email": "lisa.torres@contractiq.com", "status": "Active", "is_active": True, "lastLogin": "Jun 2, 2024 4:31 PM", "initials": "LT" },
    { "id": 4, "first_name": "Mark", "last_name": "Johnson", "name": "Mark Johnson", "dept": "Procurement", "role": "Contract Manager", "email": "mark.johnson@contractiq.com", "status": "Active", "is_active": True, "lastLogin": "Jun 1, 2024 11:07 AM", "initials": "MJ" },
    { "id": 5, "first_name": "James", "last_name": "Lee", "name": "James Lee", "dept": "Procurement", "role": "Contract Manager", "email": "james.lee@contractiq.com", "status": "Inactive", "is_active": False, "lastLogin": "May 28, 2024 2:45 PM", "initials": "JL" },
    { "id": 6, "first_name": "Alexandra", "last_name": "Ross", "name": "Alexandra Ross", "dept": "Administration", "role": "Administrator", "email": "admin@contractiq.com", "status": "Active", "is_active": True, "lastLogin": "Jun 3, 2024 10:01 AM", "initials": "AR" }
]

DEMO_ROLES_DB = [
    { "id": 1, "role": "Administrator", "permissions": ["Full System Access", "User Management", "Role Management", "Reports & Export"], "color": "border-violet-300 bg-violet-50", "icon": "ShieldCheck", "count": 1 },
    { "id": 2, "role": "Legal Manager", "permissions": ["Contract Creation", "Contract Approval", "Legal Review"], "color": "border-blue-300 bg-blue-50", "icon": "ClipboardList", "count": 3 },
    { "id": 3, "role": "Compliance Officer", "permissions": ["Compliance Monitoring", "Audit Reports"], "color": "border-emerald-300 bg-emerald-50", "icon": "Shield", "count": 2 },
    { "id": 4, "role": "Contract Manager", "permissions": ["Create Contracts", "Edit Contracts", "Renewal Management"], "color": "border-amber-300 bg-amber-50", "icon": "Briefcase", "count": 2 },
    { "id": 5, "role": "Department Head", "permissions": ["Department Contracts", "Employee Assignments"], "color": "border-orange-300 bg-orange-50", "icon": "Building2", "count": 2 },
    { "id": 6, "role": "Employee", "permissions": ["View Assigned Contracts", "Complete Obligations"], "color": "border-slate-300 bg-slate-50", "icon": "Users", "count": 2 }
]

DEMO_ACTIVITIES_DB = [
  { "ts": "Jun 3, 2024 10:14 AM", "user": "Sarah Chen", "initials": "SC", "activity": "Logged in", "ip": "192.168.1.42", "device": "Chrome / Windows", "status": "Success" },
  { "ts": "Jun 3, 2024 09:52 AM", "user": "David Park", "initials": "DP", "activity": "Password Changed", "ip": "192.168.1.55", "device": "Safari / macOS", "status": "Success" },
  { "ts": "Jun 3, 2024 09:31 AM", "user": "Unknown", "initials": "??", "activity": "Failed Login Attempt", "ip": "203.45.67.89", "device": "Firefox / Linux", "status": "Failed" },
  { "ts": "Jun 2, 2024 04:10 PM", "user": "Alexandra Ross", "initials": "AR", "activity": "Role Changed: James Lee → Legal Manager", "ip": "192.168.1.1", "device": "Chrome / Windows", "status": "Success" }
]

def get_all_users(db: Optional[Session] = None) -> List[Dict[str, Any]]:
    if db:
        try:
            db_users = db.query(User).all()
            if db_users:
                return [
                    {
                        "id": u.id,
                        "first_name": u.first_name,
                        "last_name": u.last_name,
                        "name": f"{u.first_name} {u.last_name}",
                        "dept": u.department or "General",
                        "role": u.role,
                        "email": u.email,
                        "status": "Active" if u.is_active else "Inactive",
                        "is_active": u.is_active,
                        "lastLogin": u.created_at.strftime("%b %d, %Y %I:%M %p") if u.created_at else "Recently",
                        "initials": f"{u.first_name[0]}{u.last_name[0]}"
                    }
                    for u in db_users
                ]
        except Exception as err:
            print("DB Query fallback to memory:", err)
    return DEMO_USERS_DB

def create_user(user_data: Dict[str, Any], db: Optional[Session] = None) -> Dict[str, Any]:
    full_name = user_data.get("name") or f"{user_data.get('first_name', 'New')} {user_data.get('last_name', 'User')}"
    if db:
        try:
            new_user = User(
                first_name=user_data.get("first_name", "New"),
                last_name=user_data.get("last_name", "User"),
                email=user_data.get("email", f"user{len(DEMO_USERS_DB)+1}@contractiq.com"),
                password_hash="pbkdf2:sha256:default_hash",
                role=user_data.get("role", "Employee"),
                department=user_data.get("dept") or user_data.get("department", "IT"),
                phone=user_data.get("phone", ""),
                is_active=user_data.get("is_active", True)
            )
            db.add(new_user)
            db.flush()
            
            # Automatically insert ActivityLog entry right before commit
            new_act = Activity(user_id=new_user.id, activity=f"New User Provisioned: {full_name}")
            db.add(new_act)
            db.commit()
            db.refresh(new_user)
            return {
                "id": new_user.id,
                "first_name": new_user.first_name,
                "last_name": new_user.last_name,
                "name": f"{new_user.first_name} {new_user.last_name}",
                "dept": new_user.department,
                "role": new_user.role,
                "email": new_user.email,
                "status": "Active" if new_user.is_active else "Inactive",
                "is_active": new_user.is_active,
                "lastLogin": "Just now",
                "initials": f"{new_user.first_name[0]}{new_user.last_name[0]}"
            }
        except Exception as err:
            db.rollback()
            print("DB User Create fallback:", err)
    
    # Memory fallback
    user_data["id"] = len(DEMO_USERS_DB) + 1
    user_data["name"] = full_name
    user_data["status"] = "Active" if user_data.get("is_active", True) else "Inactive"
    user_data["lastLogin"] = "Just now"
    DEMO_USERS_DB.insert(0, user_data)
    DEMO_ACTIVITIES_DB.insert(0, {
        "ts": "Just now", "user": full_name, "initials": "US", "activity": f"New User Provisioned: {full_name}", "ip": "127.0.0.1", "device": "Web Browser", "status": "Success"
    })
    return user_data

def update_user(user_id: Any, updates: Dict[str, Any], db: Optional[Session] = None) -> Dict[str, Any]:
    if db:
        try:
            u_id = int(user_id) if str(user_id).isdigit() else user_id
            db_user = db.query(User).filter(User.id == u_id).first()
            if db_user:
                for k, v in updates.items():
                    if hasattr(db_user, k):
                        setattr(db_user, k, v)
                
                # Automatically insert ActivityLog entry right before commit
                new_act = Activity(user_id=db_user.id, activity=f"User Profile Updated: {db_user.first_name} {db_user.last_name}")
                db.add(new_act)
                db.commit()
                db.refresh(db_user)
                return {
                    "id": db_user.id,
                    "name": f"{db_user.first_name} {db_user.last_name}",
                    "email": db_user.email,
                    "role": db_user.role,
                    "dept": db_user.department,
                    "status": "Active" if db_user.is_active else "Inactive"
                }
        except Exception as err:
            db.rollback()
            print("DB User Update fallback:", err)

    str_id = str(user_id)
    for u in DEMO_USERS_DB:
        if str(u["id"]) == str_id:
            u.update(updates)
            u_name = u.get("name", f"{u.get('first_name', '')} {u.get('last_name', '')}")
            DEMO_ACTIVITIES_DB.insert(0, {
                "ts": "Just now", "user": u_name, "initials": "US", "activity": f"User Profile Updated: {u_name}", "ip": "127.0.0.1", "device": "Web Browser", "status": "Success"
            })
            return u
    return {}

def delete_user(user_id: Any, db: Optional[Session] = None) -> bool:
    """SQLAlchemy DB logic for DELETE /{user_id}."""
    if db:
        try:
            u_id = int(user_id) if str(user_id).isdigit() else user_id
            db_user = db.query(User).filter(User.id == u_id).first()
            if db_user:
                db.delete(db_user)
                db.commit()
                return True
        except Exception as err:
            db.rollback()
            print("DB User Delete fallback:", err)

    str_id = str(user_id)
    global DEMO_USERS_DB
    initial_len = len(DEMO_USERS_DB)
    DEMO_USERS_DB = [u for u in DEMO_USERS_DB if str(u["id"]) != str_id]
    return len(DEMO_USERS_DB) < initial_len

def update_user_status(user_id: Any, status_data: Dict[str, Any], db: Optional[Session] = None) -> Dict[str, Any]:
    """SQLAlchemy DB logic for PATCH /{user_id}/status."""
    is_active = status_data.get("is_active")
    if is_active is None and "status" in status_data:
        is_active = (status_data["status"] == "Active")
    if is_active is None:
        is_active = True

    if db:
        try:
            u_id = int(user_id) if str(user_id).isdigit() else user_id
            db_user = db.query(User).filter(User.id == u_id).first()
            if db_user:
                db_user.is_active = is_active
                db.commit()
                db.refresh(db_user)
                return {
                    "id": db_user.id,
                    "name": f"{db_user.first_name} {db_user.last_name}",
                    "is_active": db_user.is_active,
                    "status": "Active" if db_user.is_active else "Inactive"
                }
        except Exception as err:
            db.rollback()
            print("DB User Status Patch fallback:", err)

    str_id = str(user_id)
    for u in DEMO_USERS_DB:
        if str(u["id"]) == str_id:
            u["is_active"] = is_active
            u["status"] = "Active" if is_active else "Inactive"
            return u
    return {}

def get_activities(db: Optional[Session] = None) -> List[Dict[str, Any]]:
    """SQLAlchemy DB logic for GET /activity."""
    if db:
        try:
            db_activities = db.query(Activity).all()
            if db_activities:
                return [
                    {
                        "id": a.id,
                        "ts": a.created_at.strftime("%b %d, %Y %I:%M %p") if a.created_at else "Recently",
                        "user": f"User #{a.user_id}",
                        "initials": "US",
                        "activity": a.activity,
                        "ip": "192.168.1.1",
                        "device": "Web Browser",
                        "status": "Success"
                    }
                    for a in db_activities
                ]
        except Exception as err:
            print("DB Activity Query fallback:", err)
    return DEMO_ACTIVITIES_DB

def get_all_roles(db: Optional[Session] = None) -> List[Dict[str, Any]]:
    """SQLAlchemy DB logic for GET /roles."""
    if db:
        try:
            db_roles = db.query(Role).all()
            if db_roles:
                return [
                    {
                        "id": r.id,
                        "role": r.role,
                        "permissions": json.loads(r.permissions) if r.permissions and r.permissions.startswith("[") else [r.permissions],
                        "color": r.color or "border-slate-300 bg-slate-50",
                        "icon": r.icon or "ShieldCheck",
                        "count": 0
                    }
                    for r in db_roles
                ]
        except Exception as err:
            print("DB Roles Query fallback:", err)
    return DEMO_ROLES_DB

def create_role(role_data: Dict[str, Any], db: Optional[Session] = None) -> Dict[str, Any]:
    """SQLAlchemy DB logic for POST /roles."""
    role_name = role_data.get("role", "New Role")
    perms = role_data.get("permissions", [])
    perms_str = json.dumps(perms) if isinstance(perms, list) else str(perms)

    if db:
        try:
            new_role = Role(
                role=role_name,
                permissions=perms_str,
                color=role_data.get("color", "border-violet-300 bg-violet-50"),
                icon=role_data.get("icon", "ShieldCheck")
            )
            db.add(new_role)
            db.commit()
            db.refresh(new_role)
            return {
                "id": new_role.id,
                "role": new_role.role,
                "permissions": perms,
                "color": new_role.color,
                "icon": new_role.icon,
                "count": 0
            }
        except Exception as err:
            db.rollback()
            print("DB Role Create fallback:", err)

    role_data["id"] = len(DEMO_ROLES_DB) + 1
    role_data["count"] = 0
    role_data["color"] = role_data.get("color", "border-violet-300 bg-violet-50")
    role_data["icon"] = role_data.get("icon", "ShieldCheck")
    DEMO_ROLES_DB.append(role_data)
    return role_data

