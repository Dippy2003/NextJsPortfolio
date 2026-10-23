'use client';

import { Component } from 'react';

export default class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div className="scene-fallback">
          The keyboard could not load.
          <br />
          You can explore every skill using the buttons below.
          <button
            type="button"
            className="text-button"
            onClick={() => this.setState({ failed: false })}
          >
            Try the keyboard again
          </button>
        </div>
      );
    return this.props.children;
  }
}
