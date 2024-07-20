import { useState, useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomeNode from '@/components/react-flow/CustomeNode';
import '@/styles/custome-node.css';

import IntentDialog from '@/components/intents/dialog/IntentDialog';

const initialNodes = [
    {
        id: 'node-1',
        type: 'customeNode',
        position: { x: 0, y: 0 },
        data: { value: 123 },
        intent: {
            id: 1,
            name: 'Mensaje de bienvenida',
        },
    },
    {
        id: 'node-2',
        type: 'output',
        targetPosition: 'top',
        position: { x: 0, y: 200 },
        data: { label: 'node 2' },
        intent: {
            id: 2,
            name: 'Mensaje bot de ejemplo',
        },
    },
    {
        id: 'node-3',
        type: 'output',
        targetPosition: 'top',
        position: { x: 200, y: 200 },
        data: { label: 'node 3' },
    },
];

const intents = [
    {
        id: 1,
        name: 'Mensaje de bienvenida',
    },
    {
        id: 2,
        name: 'Mensaje bot de ejemplo',
    },
];

const nodeTypes = { customeNode: CustomeNode };

const initialEdges = [];

function FlowChart() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedIntent, setSelectedIntent] = useState(null);

    const openModal = (intent) => {
        setSelectedIntent(intent);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedIntent(null);
    };

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onNodeClick = useCallback((event, node) => {
        // eslint-disable-next-line no-console
        console.log('Node clicked:', node);
    }, []);

    const onNodeDoubleClick = useCallback((event, node) => {
        openModal(intents[0]);
        // eslint-disable-next-line no-console
        console.log('Node double-clicked:', node);
    }, []);

    return (
        <div style={{ height: 750 }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                onNodeClick={onNodeClick}
                onNodeDoubleClick={onNodeDoubleClick}
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
            <IntentDialog
                open={modalIsOpen}
                onClose={closeModal}
                intent={selectedIntent}
            />
        </div>
    );
}

export default FlowChart;
