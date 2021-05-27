import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Editor} from "react-draft-wysiwyg";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {toast} from "react-toastify";

//region Types
type ContentWrapperProps = {
    viewer?: boolean,
    height?: string,
    backgroundColor?: string
}

type Props = ContentWrapperProps & {
    disabled?: boolean,
    placeholder?: string,
    onChange?: (x:string, y:boolean) => void,
    maxLength?: number,
    value?: string
}
//endregion

//region Styled
const ContentWrapper = styled.div<ContentWrapperProps>`
  position: relative;
  display: flex;
  
  .wrapperClassName {
    width: 100%;
    z-index: 0;
    border: ${props => !props.viewer ? "1px solid gray" : "none"};
    height: ${props => props.height ? props.height : !props.viewer ? "calc(100vh - 740px)" : "calc(100vh - 502px)"};
    background-color: ${props => props.backgroundColor || "transparent"};
    border-radius: 5px;
    
    .rdw-editor-main {
        height: ${props => !props.viewer ? "calc(100% - 41px)" : "100%"};
        padding: 8px;

        .DraftEditor-root {
            margin-top: -16px;
        }    
    }
  }
`;

const MaxLengthText = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 1;
    font-size: 14px;
    color: gray;
`;
//endregion

const WysiwygInput = (props: Props) => {
    const {
        disabled, viewer,
        placeholder, maxLength,
        value, height,
        backgroundColor, onChange
    } = props;

    const createEditorState = () => {
        const contentBlock = htmlToDraft(value ? value : "");
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        return EditorState.createWithContent(contentState);
    };

    const [editorState, setEditorState] = useState<EditorState>(createEditorState);

    const getOnlyText = () => {
        if (editorState) {
            const blocks = convertToRaw(editorState.getCurrentContent());
            return blocks.blocks.map(block => block.text).join("");
        }
        return "";
    };

    const getLeft = (): number => {
        if (maxLength)
            return maxLength - getOnlyText().length;
        return 0;
    };

    useEffect(() => {
        if (value !== draftToHtml(convertToRaw(editorState.getCurrentContent()))) {
            setEditorState(createEditorState());
        }
    }, [value]);

    const onChangeEvent = (e: EditorState) => {
        setEditorState(e);
        if (maxLength) {
            const chartLeft = getLeft();
            if (chartLeft < 0) {
                return toast.warning(`Секция не может быть более ${maxLength} символов, результат не будет сохранен`);
            }
        }
        if (getOnlyText().trim() === "") {
            if (onChange)
                onChange("", maxLength ? getLeft() < 0 : false);
            return;
        }
        if (onChange)
            onChange(draftToHtml(convertToRaw(e.getCurrentContent())), maxLength ? getLeft() < 0 : false);
    };

    return (
        <ContentWrapper viewer={viewer}
                        backgroundColor={backgroundColor}
                        height={height}>
            {
                maxLength && !disabled &&
                <MaxLengthText>{`Осталось символов: ${getLeft() <= 0 ? 0 : getLeft()}`}</MaxLengthText>
            }
            <Editor
                toolbar={{
                    options: ["inline", 'list', 'textAlign'],
                    inline: {
                        options: ['bold', 'italic', 'underline']
                    },
                    list: {
                        options: ['ordered'],
                    },
                    fontFamily: ['opensans']
                }}
                toolbarHidden={disabled || viewer}
                readOnly={disabled || viewer}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={e => {maxLength ? getLeft() <= 0 ? null : onChangeEvent(e) : onChangeEvent(e)}}
                placeholder={placeholder}
            />
        </ContentWrapper>
    )
};

export default WysiwygInput;
