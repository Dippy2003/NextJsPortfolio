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
          The interactive scene is unavailable on this device.
          <br />
          You can explore every skill using the buttons below.
        </div>
      );
    return this.props.children;
  }
}
