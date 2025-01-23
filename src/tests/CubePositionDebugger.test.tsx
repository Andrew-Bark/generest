/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Vector3 } from 'three';
import CubePositionDebugger from '../components/CubePositionDebugger';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import { expectTypeOf } from 'expect-type';

// Mock Html - maybe use jsdom?
vi.mock('@react-three/drei', () => ({
  Html: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('CubePositionDebugger', () => {
  const position: Vector3 = new Vector3(1.234, 5.678, 9.101);

  it('renders with the correct props', () => {
    // Renders the component
    const mockPositionElement = <CubePositionDebugger position={position} />;

    // Checking if the component renders with correct props
    const elementProps = mockPositionElement.props;

    expect(elementProps.position).toBeDefined();
    expect(elementProps.position).toBeInstanceOf(Vector3);
  });

  it('checking position properties', () => {
    // Render the component
    const mockPositionElement = <CubePositionDebugger position={position} />;

    // Destructure position
    const { x, y, z } = mockPositionElement.props.position;

    // Validate individual coordinates
    expect(x).toBe(1.234);
    expect(y).toBe(5.678);
    expect(z).toBe(9.101);
  });

  it('renders without crashing in Three.js test renderer', async () => {
    // Render with ReactThreeTestRenderer
    const renderer = await ReactThreeTestRenderer.create(
      <CubePositionDebugger position={position} />
    );

    expect(renderer.scene).toBeDefined();
  });

  it('CubePositionDebugger should be a function', () => {
    // Check the type of CubePositionDebugger
    expectTypeOf(CubePositionDebugger).toBeFunction();
  });

  // it('throws an error when position prop does not have x, y, z keys', () => {
  //   const invalidPosition = { a: 1, b: 2, c: 3 }; // Invalid position

  //   expect(() => {
  //     mockPosition.props = invalidPosition
  //   }).toThrowError(/position must have x, y, and z/i);
  // });
});

