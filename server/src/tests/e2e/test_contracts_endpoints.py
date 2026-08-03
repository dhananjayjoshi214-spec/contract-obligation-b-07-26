def test_list_contracts_returns_seeded_data(client):
    response = client.get("/api/contracts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 10


def test_contracts_filtering_and_search(client):
    res = client.get("/api/contracts?search=Accenture")
    assert res.status_code == 200
    assert len(res.json()) >= 1
    assert "Accenture" in res.json()[0]["name"]

    res_type = client.get("/api/contracts?type=Vendor")
    assert res_type.status_code == 200
    for contract in res_type.json():
        assert contract["type"] == "Vendor"

    res_status = client.get("/api/contracts?status=Active")
    assert res_status.status_code == 200
    for contract in res_status.json():
        assert contract["status"] == "Active"


def test_contracts_summary(client):
    res = client.get("/api/contracts/summary")
    assert res.status_code == 200
    data = res.json()
    assert "total" in data
    assert "active" in data
    assert "expiring_soon" in data
    assert "showing" in data


def test_get_single_contract(client):
    response = client.get("/api/contracts/CTR-2024-001")
    assert response.status_code == 200
    assert response.json()["party"] == "Accenture LLP"


def test_get_missing_contract_returns_404(client):
    response = client.get("/api/contracts/CTR-9999-999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Contract 'CTR-9999-999' not found"


def test_create_update_delete_contract(client):
    # Create
    new_contract = {
        "name": "Test Agreement",
        "type": "Services",
        "party": "Test Corp",
        "effective": "2024-01-01",
        "expiry": "2025-01-01",
        "status": "Active",
        "owner": "Test User",
        "value": "$100,000",
        "governing_law": "California",
    }
    create_res = client.post("/api/contracts", json=new_contract)
    assert create_res.status_code == 201
    created_id = create_res.json()["id"]
    assert create_res.json()["name"] == "Test Agreement"
    assert create_res.json()["governing_law"] == "California"

    # Update
    update_res = client.patch(f"/api/contracts/{created_id}", json={"name": "Updated Test Agreement"})
    assert update_res.status_code == 200
    assert update_res.json()["name"] == "Updated Test Agreement"

    # Delete
    del_res = client.delete(f"/api/contracts/{created_id}")
    assert del_res.status_code == 204

    # Verify deleted
    get_res = client.get(f"/api/contracts/{created_id}")
    assert get_res.status_code == 404
