import React, { Component } from 'react';
import { imageLoadMonitor } from '../../views/Chat';

type State = {
  previewOpen: boolean;
};

type Props = {
  src: string;
  alt: string;
};

export class ChatImage extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      previewOpen: false,
    };
  }

  render() {
    let ref: HTMLSpanElement | null = null;
    if (this.props.alt.includes('emoji-')) {
      return (
        <img src={this.props.src} alt={this.props.alt} className="emoji" />
      );
    }

    return (
      <span className="chat-image-wrapper" ref={(spanRef) => (ref = spanRef)}>
        <span
          className={`image-preview modal ${
            this.state.previewOpen ? 'is-active' : ''
          }`}
        >
          <span
            className="modal-background image-preview-background"
            onClick={() => {
              this.setState({
                previewOpen: false,
              });
            }}
          />
          <span className="modal-content">
            <span className="box has-background-black">
              <img
                src={this.props.src}
                alt={this.props.alt}
                style={{
                  width: '100%',
                  maxWidth: '100vw',
                }}
                onClick={() => {
                  this.setState({
                    previewOpen: true,
                  });
                }}
              />
              <a
                href={this.props.src}
                rel="noopener noreferrer"
                target={'_blank'}
              >
                Open original
              </a>
            </span>
          </span>
        </span>
        <img
          onLoad={() => imageLoadMonitor.emit('imageLoad', ref)}
          src={this.props.src}
          alt={this.props.alt}
          style={{ maxHeight: '300px' }}
          onClick={() => {
            this.setState({
              previewOpen: true,
            });
          }}
        />
        <br />
      </span>
    );
  }
}
