import React from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  useDroppable
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Loader2 } from 'lucide-react';
import './OrdersKanban.css';

interface Order {
  _id: string;
  orderId: string;
  client: string;
  avatar: string;
  status: 'Completed' | 'Live' | 'Scheduled';
  date: string;
  amount: string;
}

interface OrdersKanbanProps {
  orders: Order[];
  isLoading: boolean;
  onUpdateStatus: (id: string, newStatus: string) => void;
}

// 1. Dumb UI Component
const OrderCard = React.forwardRef<HTMLDivElement, { order: Order; style?: React.CSSProperties; [key: string]: any }>(
  ({ order, style, ...props }, ref) => {
    return (
      <div ref={ref} style={style} {...props} className="kanban-card glass">
        <div className="kanban-card-header">
          <span className="order-id">{order.orderId}</span>
          <span className="amount-value" style={{ color: 'var(--warning)', fontWeight: 'bold' }}>{order.amount}</span>
        </div>
        <div className="client-cell" style={{ margin: '1rem 0' }}>
          <img src={order.avatar} alt={order.client} className="client-avatar" />
          <span className="client-name">{order.client}</span>
        </div>
        <div className="kanban-card-footer">
          <span className="date-cell">{order.date}</span>
        </div>
      </div>
    );
  }
);

OrderCard.displayName = 'OrderCard';

// 2. Sortable Wrapper Component
const SortableOrderCard = ({ order }: { order: Order }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: order._id, data: order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <OrderCard 
      ref={setNodeRef} 
      style={style} 
      order={order} 
      {...attributes} 
      {...listeners} 
    />
  );
};

// 3. Column Component
const Column = ({ id, title, items }: { id: string, title: string, items: Order[] }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="kanban-column">
      <div className={`kanban-column-header status-${id.toLowerCase()}`}>
        <h4>{title}</h4>
        <span className="count-badge">{items.length}</span>
      </div>
      <div className="kanban-column-content" ref={setNodeRef}>
        <SortableContext id={id} items={items.map(i => i._id)} strategy={verticalListSortingStrategy}>
          {items.map(order => (
            <SortableOrderCard key={order._id} order={order} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

const OrdersKanban: React.FC<OrdersKanbanProps> = ({ orders, isLoading, onUpdateStatus }) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const columns = {
    'Scheduled': orders.filter(o => o.status === 'Scheduled'),
    'Live': orders.filter(o => o.status === 'Live'),
    'Completed': orders.filter(o => o.status === 'Completed')
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const overId = over.id as string;
    let targetStatus = '';

    // Check if dropped directly onto a column container
    if (['Scheduled', 'Live', 'Completed'].includes(overId)) {
      targetStatus = overId;
    } else {
      // Otherwise, it was dropped on another card
      const overOrder = orders.find(o => o._id === overId);
      if (overOrder) targetStatus = overOrder.status;
    }

    const activeOrder = orders.find(o => o._id === active.id);

    if (activeOrder && targetStatus && activeOrder.status !== targetStatus) {
      onUpdateStatus(activeOrder._id, targetStatus);
    }
  };

  const activeOrder = React.useMemo(
    () => (activeId ? orders.find(o => o._id === activeId) : null),
    [activeId, orders]
  );

  if (isLoading) {
    return (
      <div className="table-loader">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span>Loading Board Data...</span>
      </div>
    );
  }

  return (
    <div className="kanban-board">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {Object.entries(columns).map(([status, items]) => (
          <Column key={status} id={status} title={status} items={items} />
        ))}
        <DragOverlay>
          {activeOrder ? <OrderCard order={activeOrder} style={{ cursor: 'grabbing', opacity: 1, transform: 'scale(1.05)', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default OrdersKanban;
