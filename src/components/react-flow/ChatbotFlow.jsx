import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importa la función para generar UUIDs
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

const initialNodes = [
    {
        id: uuidv4(), // Genera un UUID único para el ID del nodo
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
        id: uuidv4(), // Genera un UUID único para el ID del nodo
        name: 'En que puedo ayudarte hoy',
        is_choice: false,
        save_information: false,
        type: 'customeNode',
        position: { x: 0, y: 100 },
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
        if (buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const flowChartRect = document.getElementById('flow-chart').getBoundingClientRect();
            const newNode = {
                id: uuidv4(), // Usa UUID para el nuevo ID
                name: 'Nuevo nodo',
                is_choice: false,
                save_information: false,
                type: 'customeNode',
                position: {
                    x: (buttonRect.left - flowChartRect.left) + buttonRect.width / 2,
                    y: buttonRect.bottom - flowChartRect.top + 20
                },
                data: { label: 'Nuevo nodo' },
                phrases: [],
                responses: [],
                options: [],
            };
            setNodes((nds) => [...nds, newNode]);
        }
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
