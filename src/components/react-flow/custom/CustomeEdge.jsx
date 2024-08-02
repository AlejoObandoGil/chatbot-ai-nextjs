// CustomEdge.js
import {
    BaseEdge,
    EdgeLabelRenderer,
    getSmoothStepPath,
    useReactFlow,
} from '@xyflow/react';
import { Button } from "@material-tailwind/react";
import { MdDeleteForever } from "react-icons/md";

export default function CustomEdge({ id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, style }) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} style={style} />
            <EdgeLabelRenderer>
                <Button
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                    variant='text'
                    color="indigo"
                    className='mr-2'
                    onClick={() => {
                        setEdges((edges) => edges.filter((e) => e.id !== id));
                    }}
                >
                    borrar
                </Button>
            </EdgeLabelRenderer>
        </>
    );
}
