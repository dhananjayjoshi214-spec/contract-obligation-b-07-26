import React from 'react';

// ─── PURE JS ALIAS ───
const e = React.createElement;

function Notifications({ items = [], onClose }) {
  return e('div', { style: { position: 'absolute', right: 24, top: 72, zIndex: 1200, width: 320 } },
    e('div', { style: { background: '#fff', borderRadius: 12, boxShadow: '0 10px 30px rgba(2,6,23,0.12)', overflow: 'hidden' } },
      
      // Header
      e('div', { style: { padding: 12, borderBottom: '1px solid #eef2f6', fontWeight: 700 } }, 'Notifications'),
      
      // Scrollable List area
      e('div', { style: { maxHeight: 320, overflow: 'auto' } },
        
        // Map through items array
        items.map(n => 
          e('div', { key: n.id, style: { padding: 12, borderBottom: '1px solid #f3f6fb' } },
            e('div', { style: { fontWeight: 700 } }, n.title),
            e('div', { style: { fontSize: 12, color: '#64748b' } }, n.time)
          )
        ),
        
        // Show "No notifications" if the array is empty
        items.length === 0 ? e('div', { style: { padding: 12, color: '#64748b' } }, 'No notifications') : null
      ),
      
      // Footer with Close Button
      e('div', { style: { padding: 10, textAlign: 'right' } },
        e('button', { 
          onClick: onClose, 
          style: { border: 'none', background: 'transparent', color: '#2563eb', cursor: 'pointer' } 
        }, 'Close')
      )
    )
  );
}

export default Notifications;