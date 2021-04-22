import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Editor} from "react-draft-wysiwyg";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {toast} from "react-toastify";

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  
  .wrapperClassName {
    width: 100%;
    z-index: 0;
    border: ${props => !props.viewer ? "1px solid gray" : "none"};
    height: ${props => props.height ? props.height : !props.viewer ? "calc(100vh - 740px)" : "calc(100vh - 502px)"};
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

class WysiwygInput extends PureComponent {
    constructor(props) {
        super(props);
        const contentBlock = htmlToDraft(props.value);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {editorState}
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.value !== draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))) {
            const contentBlock = htmlToDraft(nextProps.value);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({editorState});
        }
    }

    getOnlyText = () => {
        const {editorState} = this.state;
        let text = "";
        if (editorState) {
            const blocks = convertToRaw(editorState.getCurrentContent());
            blocks.blocks.map(block => {
                text += block.text;
            })
        }
        return text;
    };

    getLeft = () => {
        const {maxLenght} = this.props;
        let text = this.getOnlyText();
        return maxLenght - text.length;
    };

    render() {
        const {
            disabled,
            viewer,
            placeholder,
            maxLenght,
            height
        } = this.props;

        const {editorState} = this.state;

        const chartLeft = this.getLeft();

        return (
            <ContentWrapper viewer={viewer}
                            height={height}>
                {
                    maxLenght && !disabled &&
                    <MaxLengthText>{`Осталось символов: ${chartLeft <= 0 ? 0 : chartLeft}`}</MaxLengthText>
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
                    onEditorStateChange={maxLenght ? chartLeft <= 0 ? null : this.onChange : this.onChange}
                    placeholder={placeholder}
                />
            </ContentWrapper>
        );
    }

    onChange = e => {
        const {onChange, maxLenght} = this.props;
        this.setState({editorState: e}, () => {
            const chartLeft = this.getLeft();
            if (maxLenght && chartLeft < 0) {
                return toast.warning(`Секция не может быть более ${maxLenght} символов, результат не будет сохранен`);
            }
            if (this.getOnlyText().trim() === "") {
                onChange("", maxLenght ? chartLeft < 0 : false);
                return;
            }
            onChange(draftToHtml(convertToRaw(e.getCurrentContent())), maxLenght ? chartLeft < 0 : false);
        });
    };
}

WysiwygInput.propTypes = {
    disabled: PropTypes.bool,
    viewer: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    maxLenght: PropTypes.number,
    value: PropTypes.string,
    height: PropTypes.string,
};

export default WysiwygInput;
