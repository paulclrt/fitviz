import { PointerEvent } from "react"
import { PointerSensor } from "@dnd-kit/core"

/**
 * source: https://github.com/clauderic/dnd-kit/issues/477
 * An extended "PointerSensor" that prevent some
 * interactive html element(button, input, textarea, select, option...) from dragging
 */
export class CustomPointerSensor extends PointerSensor {
    static activators = [
        {
            eventName: 'onPointerDown' as any,
            handler: ({nativeEvent: event}: PointerEvent) => {
                if (
                    !event.isPrimary ||
                    event.button !== 0 ||
                isInteractiveElement(event.target as Element)
                ) {
                    return false;
                }

                return true;
            },
        },
    ];
}

function isInteractiveElement(element: Element | null) {
    const interactiveElements = [
        'button',
        // 'input',
        // 'textarea',
        // 'select',
        // 'option',
    ];

    if (element == null) {
        return false 
    }


    //we don't want to trigger when clicking the close cross
    if (interactiveElements.includes(element.tagName.toLowerCase())) {
        return true;
    }

    // this is the tile content we do not want to trigger the drag and drop on
    if (element.id == "tile-content" || element.closest("#tile-content") ) { // either is the tile-content or is child of it
        return true 
    }

    return false ;
}
