import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { Button } from "@material-tailwind/react";

// Tamaño del nodo (ajustar según tu diseño)
const NODE_WIDTH = 150; // Ancho del nodo en píxeles
const NODE_HEIGHT = 100; // Altura del nodo en píxeles
const NODE_SPACING = 20; // Espacio entre nodos en píxeles

const initialNodes = [
    {
        id: uuidv4(),
        name: 'Mensaje de bienvenida',
        is_choice: false,
        save_information: false,
        type: 'customeNode',
        position: { x: 0, y: 0 },
        data: { label: 'Mensaje de bienvenida' },
        phrases: [],
        responses: [],
        options: [],
    },
    {
        id: uuidv4(),
        name: 'En que puedo ayudarte hoy',
        is_choice: false,
        save_information: false,
        type: 'customeNode',
        position: { x: 0, y: NODE_HEIGHT + NODE_SPACING },
        data: { label: 'En que puedo ayudarte hoy' },
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
    const buttonRef = useRef(null);

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
        console.log('Node clicked:', node);
    }, []);

    const onNodeDoubleClick = useCallback((event, node) => {
        openModal(node);
        console.log('Node double-clicked:', node);
    }, []);

    const handleNodeSave = (updatedNode) => {
        setNodes((nodes) =>
            nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
        );
    };

    const addNewNode = () => {
        let newPosition = {};
        if (nodes.length > 0) {
            const lastNode = nodes[nodes.length - 1];

            newPosition = {
                x: lastNode.position.x,
                y: lastNode.position.y + NODE_HEIGHT + NODE_SPACING,
            };
        } else {
            newPosition= { x: 0, y: 0 }
        }

        const newNode = {
            id: uuidv4(),
            name: 'Nuevo nodo',
            is_choice: false,
            save_information: false,
            type: 'customeNode',
            position: newPosition,
            data: { label: 'Nuevo nodo' },
            phrases: [],
            responses: [],
            options: [],
        };
        setNodes((nds) => [...nds, newNode]);
    };

    return (
        <div id="flow-chart" style={{ height: 600, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 0 }}>
                <Button
                    ref={buttonRef}
                    variant='gradient'
                    className='me-2'
                    color="indigo"
                    onClick={addNewNode}
                >
                    Agregar nuevo nodo
                </Button>
                <Button
                    ref={buttonRef}
                    variant='gradient'
                    className='me-2'
                    color="green"
                >
                    Guardar progreso
                </Button>
            </div>
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
                    onSave={handleNodeSave}
                />}
        </div>
    );
}

export default FlowChart;
