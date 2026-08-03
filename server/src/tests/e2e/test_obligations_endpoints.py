def test_list_obligations(client):
    response = client.get("/api/obligations")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5


def test_list_obligations_by_contract_id(client):
    response = client.get("/api/obligations?contract_id=CTR-2024-001")
    assert response.status_code == 200
    data = response.json()
    for obl in data:
        assert obl["contract_id"] == "CTR-2024-001"


def test_get_single_obligation(client):
    response = client.get("/api/obligations/OBL-001")
    assert response.status_code == 200
    assert response.json()["contract_id"] == "CTR-2024-001"


def test_get_missing_obligation_returns_404(client):
    response = client.get("/api/obligations/OBL-999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Obligation 'OBL-999' not found"


def test_create_update_delete_obligation(client):
    new_obl = {
        "contract_id": "CTR-2024-001",
        "title": "Perform quarterly audit",
        "assignee": "Sarah Chen",
        "due": "Oct 1, 2024",
        "priority": "High",
        "status": "Active",
        "category": "Compliance",
    }
    create_res = client.post("/api/obligations", json=new_obl)
    assert create_res.status_code == 201
    created_id = create_res.json()["id"]

    update_res = client.patch(f"/api/obligations/{created_id}", json={"status": "Completed"})
    assert update_res.status_code == 200
    assert update_res.json()["status"] == "Completed"

    del_res = client.delete(f"/api/obligations/{created_id}")
    assert del_res.status_code == 204

    get_res = client.get(f"/api/obligations/{created_id}")
    assert get_res.status_code == 404
