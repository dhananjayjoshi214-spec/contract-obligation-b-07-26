import React, { useState } from 'react';

// ─── PURE JS ALIAS ───
const e = React.createElement;

function AddRenewalModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [department, setDepartment] = useState('');
  const [type, setType] = useState('Software');
  const [renewalDate, setRenewalDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  if (!open) return null;

  function submit(event) {
    event.preventDefault();
    const item = {
      name,
      owner,
      department,
      type,
      renewalDate,
      priority
    };
    onSubmit(item);
  }

  // Helper style to keep the inputs looking clean and uniform
  const inputStyle = { 
    width: '100%', 
    padding: '10px', 
    marginTop: '6px', 
    borderRadius: '6px', 
    border: '1px solid #e2e8f0',
    boxSizing: 'border-box'
  };

  // ─── PURE JS RENDER TREE ───
  return e('div', { style: { position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.45)', display: 'grid', placeItems: 'center', zIndex: 2000 } },
    e('form', { onSubmit: submit, style: { width: 640, background: '#fff', padding: 24, borderRadius: 12, fontFamily: 'sans-serif' } },
      
      e('h3', { style: { marginTop: 0, marginBottom: 20, fontSize: '20px' } }, 'Add Renewal'),
      
      e('div', { style: { display: 'grid', gap: 16, fontSize: '14px' } },
        
        // 1. Contract Name Input
        e('label', { style: { fontWeight: '600' } },
          'Contract name',
          e('input', { 
            value: name, 
            onChange: (evt) => setName(evt.target.value), 
            required: true, 
            placeholder: 'e.g. Zoom Enterprise License',
            style: inputStyle 
          })
        ),

        // 2. Owner & Department Row
        e('div', { style: { display: 'flex', gap: 16 } },
          e('label', { style: { flex: 1, fontWeight: '600' } },
            'Contract Owner',
            e('input', { 
              value: owner, 
              onChange: (evt) => setOwner(evt.target.value), 
              required: true, 
              placeholder: 'e.g. David Park',
              style: inputStyle 
            })
          ),
          e('label', { style: { flex: 1, fontWeight: '600' } },
            'Department',
            e('input', { 
              value: department, 
              onChange: (evt) => setDepartment(evt.target.value), 
              required: true, 
              placeholder: 'e.g. IT',
              style: inputStyle 
            })
          )
        ),

        // 3. Type & Priority Row
        e('div', { style: { display: 'flex', gap: 16 } },
          e('label', { style: { flex: 1, fontWeight: '600' } },
            'Contract Type',
            e('select', { 
              value: type, 
              onChange: (evt) => setType(evt.target.value), 
              style: inputStyle 
            },
              e('option', null, 'Software'),
              e('option', null, 'Vendor'),
              e('option', null, 'Lease'),
              e('option', null, 'Services'),
              e('option', null, 'NDA'),
              e('option', null, 'Compliance'),
              e('option', null, 'Employment')
            )
          ),
          e('label', { style: { flex: 1, fontWeight: '600' } },
            'Priority',
            e('select', { 
              value: priority, 
              onChange: (evt) => setPriority(evt.target.value), 
              style: inputStyle 
            },
              e('option', null, 'Critical'),
              e('option', null, 'High'),
              e('option', null, 'Medium'),
              e('option', null, 'Low')
            )
          )
        ),

        // 4. Renewal Date
        e('label', { style: { fontWeight: '600' } },
          'Renewal date',
          e('input', { 
            type: 'date', 
            value: renewalDate, 
            onChange: (evt) => setRenewalDate(evt.target.value), 
            required: true, 
            style: inputStyle 
          })
        ),

        // 5. Action Buttons
        e('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 } },
          e('button', { 
            type: 'button', 
            onClick: onClose, 
            style: { padding: '10px 16px', border: '1px solid #cbd5e1', background: 'transparent', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' } 
          }, 'Cancel'),
          
          e('button', { 
            type: 'submit', 
            style: { padding: '10px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' } 
          }, 'Add renewal')
        )
      )
    )
  );
}

export default AddRenewalModal;