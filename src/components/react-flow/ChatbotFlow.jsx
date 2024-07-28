import { useState, useCallback, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from '@/lib/axios';
import CustomeNode from '@/components/react-flow/CustomeNode';
import CustomeEdge from '@/components/react-flow/CustomeEdge';
import IntentDialog from '@/components/intents/dialog/IntentDialog';
import useSaveProgress from './SaveProgress';
import { Button, Alert } from "@material-tailwind/react";

const NODE_HEIGHT = 100;
const NODE_SPACING = 20;

function ChatbotFlow({ chatbotId }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [typeInformationRequired, setTypeInformationRequired] = useState([]);
    const [flowKey, setFlowKey] = useState(0);

    const nodeTypes = useMemo(() => ({ customeNode: CustomeNode }), []);
    const edgeTypes = useMemo(() => ({ customeEdge: CustomeEdge }), []);

    useEffect(() => {
        const fetchIntents = async () => {
            try {
                const { data } = await axios.get(`/api/v1/chatbot/${chatbotId}/intent`);

                const dataEdges = data.edges;
                const fetchedEdges = dataEdges.map(edge => ({
                    ...edge,
                    type: 'customeEdge'
                }));
                const dataIntents = data.intents;
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
                        category: intent.category,
                        save_information: intent.save_information,
                        type: 'customeNode',
                        position: { x, y },
                        data: {
                            label: intent.name,
                            options: intent.options || []
                        },
                        training_phrases: intent.training_phrases || [],
                        information_required: intent.information_required,
                        responses: intent.responses || [],
                        options: intent.options || [],
                    };
                });

                setEdges(fetchedEdges);
                setNodes(fetchedNodes);
                setTypeInformationRequired(data.type_information_required);
            } catch (error) {
                console.error('Error fetching intents:', error);
            }
        };

        fetchIntents();
    }, [chatbotId]);

    const handleNodeSave = (updatedNode) => {
        setNodes((nodes) =>
            nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
        );
        setFlowKey(prevKey => prevKey + 1);
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
            category: 'información general',
            save_information: false,
            type: 'customeNode',
            position: newPosition,
            data: {
                label: 'Nuevo nodo',
                options: []
            },
            training_phrases: [],
            responses: [],
            options: [],
        };
        setNodes((nds) => [...nds, newNode]);
    };

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

    const onNodeDoubleClick = useCallback((event, node) => {
        openModal(node);
    }, []);

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => [
            ...eds,
            {
                id: uuidv4(),
                ...params,
                type: 'customeEdge'
            }
        ]),
        [],
    );

    const {
        saveProgress,
        loadingSave,
        alertMessage,
        showAlert,
        alertColor,
    } = useSaveProgress(chatbotId, nodes, edges);

    return (
        <div id="flow-chart" style={{ height: 600, position: 'relative' }}>
            {showAlert && (
                <Alert
                    color={alertColor}
                    dismissible
                    className="mt-2 mb-2"
                >
                    {alertMessage}
                </Alert>
            )}
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 0 }}>
                <Button
                    variant='gradient'
                    color="indigo"
                    className='mr-2'
                    onClick={addNewNode}
                >
                    Agregar nuevo nodo
                </Button>
                <Button
                    variant='gradient'
                    color="green"
                    onClick={saveProgress}
                    disabled={loadingSave}
                >
                    Guardar progreso
                </Button>
            </div>
            <ReactFlow
                key={flowKey}
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
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
