import { useCallback, useState } from 'react';
import {
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    {
        id: 'A',
        type: 'input',
        position: { x: 0, y: 0 },
    },
    {
        id: 'A-1',
        type: 'input',
        data: { label: 'Child Node 1' },
        position: { x: 10, y: 10 },
        parentId: 'A',
        extent: 'parent',
    },
    {
        id: 'A-2',
        data: { label: 'Child Node 2' },
        position: { x: 10, y: 90 },
        parentId: 'A',
        extent: 'parent',
    },
    {
        id: 'B',
        type: 'output',
        position: { x: -100, y: 200 },
        data: { label: 'Node B' },
    },
    {
        id: 'C',
        type: 'output',
        position: { x: 100, y: 200 },
        data: { label: 'Node C' },
    },
];

const initialEdges = [
    { id: 'a1-a2', source: 'A-1', target: 'A-2' },
    { id: 'a2-b', source: 'A-2', target: 'B' },
    { id: 'a2-c', source: 'A-2', target: 'C' },
];

const rfStyle = {
    backgroundColor: '#D0C0F7',
};

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <div id="flow-chart" style={{ height: 600, position: 'relative' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                style={rfStyle}
                attributionPosition="top-right"
            >
                <Background />
            </ReactFlow>
        </div>
    );
}

export default Flow;
