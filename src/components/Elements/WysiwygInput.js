import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Editor} from "react-draft-wysiwyg";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  
  .wrapperClassName {
    width: 100%;
    z-index: 0;
    border: ${props => !props.viewer ? "1px solid gray" : "none"};
    height: ${props => !props.viewer ? "calc(100vh - 740px)" : "calc(100vh - 470px)"};
    border-radius: 5px;
    
    .rdw-editor-main {
        height: ${props => !props.viewer ? "calc(100% - 41px)" : "100%"};

        .DraftEditor-root {
            margin-top: -16px;
        }    
    }
  }
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

    render() {
        const {
            disabled,
            viewer,
            placeholder
        } = this.props;

        const {editorState} = this.state;

        return (
            <ContentWrapper viewer={viewer}>
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
                    onEditorStateChange={this.onChange}
                    onBlur={this.onBlur}
                    placeholder={placeholder}
                />
            </ContentWrapper>
        );
    }

    onBlur = () => {
        const {onChange} = this.props;
        const {editorState} = this.state;
        onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    onChange = e => {
        this.setState({editorState: e});
    };
}

WysiwygInput.propTypes = {
    disabled: PropTypes.bool,
    viewer: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default WysiwygInput;
