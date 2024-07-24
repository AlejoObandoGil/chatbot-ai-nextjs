import { useState, useCallback, useEffect, useRef } from 'react';
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
import axios from '@/lib/axios';
import CustomeNode from '@/components/react-flow/CustomeNode';
import IntentDialog from '@/components/intents/dialog/IntentDialog';
import { Button } from "@material-tailwind/react";

const NODE_HEIGHT = 100;
const NODE_SPACING = 20;

const nodeTypes = { customeNode: CustomeNode };

const initialEdges = [];

function ChatbotFlow({ chatbotId }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState(initialEdges);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [typeInformationRequired, setTypeInformationRequired] = useState([]);
    const buttonRef = useRef(null);

    useEffect(() => {
        const fetchIntents = async () => {
            try {
                const { data } = await axios.get(`/api/v1/chatbot/${chatbotId}/intent`);
                console.log('Raw data from API:', data);

                const dataIntents = data.intents;

                console.log('Chatbots fetched:', dataIntents);

                const fetchedNodes = dataIntents.map(intent => {
                    let position = { x: 0, y: 0 };

                    if (intent.position) {
                        try {
                            position = JSON.parse(intent.position);
                        } catch (e) {
                            console.error('Error parsing position:', intent.position, e);
                        }
                    }

                    const x = Number.isFinite(position.x) ? position.x : 0;
                    const y = Number.isFinite(position.y) ? position.y : 0;

                    return {
                        id: intent.id,
                        name: intent.name,
                        is_choice: intent.is_choice,
                        save_information: intent.save_information,
                        type: 'customeNode',
                        position: { x, y },
                        data: { label: intent.name },
                        training_phrases: intent.training_phrases || [],
                        information_required: intent.information_required || [],
                        responses: intent.responses || [],
                        options: intent.options || [],
                    };
                });

                setNodes(fetchedNodes);
                setTypeInformationRequired(data.type_information_required);
            } catch (error) {
                console.error('Error fetching intents:', error);
            }
        };

        fetchIntents();
    }, [chatbotId]);

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

    // const onNodeClick = useCallback((event, node) => {
    //     // console.log('Node clicked:', node);
    // }, []);

    const onNodeDoubleClick = useCallback((event, node) => {
        openModal(node);
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
            newPosition = { x: 0, y: 0 }
        }

        const newNode = {
            id: uuidv4(),
            name: 'Nuevo nodo',
            is_choice: false,
            save_information: false,
            type: 'customeNode',
            position: newPosition,
            data: { label: 'Nuevo nodo' },
            training_phrases: [],
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
                // onNodeClick={onNodeClick}
                onNodeDoubleClick={onNodeDoubleClick}
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
            {modalIsOpen &&
                <IntentDialog
                    chatbotId={chatbotId}
                    node={selectedNode}
                    typeInformationRequired={typeInformationRequired}
                    open={modalIsOpen}
                    onClose={closeModal}
                    onSave={handleNodeSave}
                />}
        </div>
    );
}

export default ChatbotFlow;
