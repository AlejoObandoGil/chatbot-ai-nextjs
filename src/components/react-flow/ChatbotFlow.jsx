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
import IntentDialog from '@/components/intents/dialog/IntentDialog';

const initialNodes = [
    {
        id: '1',
        type: 'customeNode',
        position: { x: 0, y: 0 },
        data: { label: 'Mensaje de bienvenida' },
            name: 'Mensaje de bienvenida',
            phrases: [],
            responses: [],
            options: [],
    },
    {
        id: '2',
        type: 'customeNode',
        position: { x: 0, y: 100 },
        data: { label: 'En que puedo ayudarte hoy' },
            name: 'En que puedo ayudarte hoy',
            phrases: [],
            responses: [],
            options: [],
    },
];

const nodeTypes = { customeNode: CustomeNode };

const initialEdges = [];

function FlowChart() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    const openModal = (node) => {
        setSelectedNode(node);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedNode(null);
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
        openModal(node);
        // eslint-disable-next-line no-console
        console.log('Node double-clicked:', node);
    }, []);

    return (
        <div style={{ height: 600 }}>
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
            {modalIsOpen &&
                <IntentDialog
                    open={modalIsOpen}
                    onClose={closeModal}
                    node={selectedNode}
            />}
        </div>
    );
}

export default FlowChart;
