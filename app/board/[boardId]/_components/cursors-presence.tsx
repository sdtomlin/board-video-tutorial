"use client";

import { memo } from "react";
import { shallow, useOthersConnectionIds, useOthersMapped } from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";
import { colourToCss } from "@/lib/utils";
import { Path } from "./path";

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    )
}

const Drafts = () => {
    const others = useOthersMapped((other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColour: other.presence.pencilColour
    }), shallow);

    return (
        <>
            {others.map(([key, other]) => {
                if (other.pencilDraft) {
                    return (
                        <Path 
                            key={key}
                            x={0}
                            y={0}
                            points={other.pencilDraft}
                            fill={other.penColour ? colourToCss(other.penColour) : "#000"} />
                    );
                }
            })}
        </>
    )
};

export const CursorsPresence = memo(() => {
    return (
        <>
            <Cursors />
        </>
    );
});

CursorsPresence.displayName ="Cursors Presence";