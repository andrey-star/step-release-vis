/*
 * Copyright 2020 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 */

import {TestBed} from '@angular/core/testing';

import {CandidateService} from './candidateService';
import {Polygon} from '../models/Polygon';
import {Point} from '../models/Point';

describe('CandidateService', () => {
  let service: CandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateService);
    service = new CandidateService();
    service.addCandidate(3, '1');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#addCandidate', () => {
    it('test if the color changes when the candidate already exists', () => {
      service = new CandidateService();
      service.addCandidate(3, '1');
      // readd same candidate
      service.addCandidate(6, '1');
      expect(service.cands.get('1').color).toEqual(6);
    });
  });

  describe('#addPolygons', () => {
    it('candidate is already present in map', () => {
      const inputPolygons: Polygon[] = [
        new Polygon([new Point(0, 10), new Point(1, 0)], '1'),
      ];

      service.addPolygons(inputPolygons);

      expect(service.cands.get('1').polygons).toEqual(inputPolygons);
    });

    it('candidate is not already present in map', () => {
      const inputPolygons: Polygon[] = [
        new Polygon([new Point(0, 10), new Point(1, 0)], '2'),
      ];

      service.addPolygons(inputPolygons);

      expect(service.cands.get('1').candName).toBe('1');
      expect(service.cands.get('2').polygons).toEqual(inputPolygons);
    });
  });

  describe('#polygonHovered', () => {
    it('1 and 2 are in the same release, 3 is in another release', () => {
      const polygonsOfCandidate1: Polygon[] = [
        new Polygon([], '1'),
        new Polygon([], '1'),
      ];
      service.addPolygons(polygonsOfCandidate1);

      const polysOfCandidate2: Polygon[] = [new Polygon([], '2')];
      service.addPolygons(polysOfCandidate2);

      const polysOfCandidate3: Polygon[] = [new Polygon([], '3')];
      service.addPolygons(polysOfCandidate3);

      service.inRelease.set('1', 'release');
      service.inRelease.set('2', 'release');
      service.inRelease.set('3', 'otherrelease');
      service.releaseCandidates.set('release', ['1', '2']);
      service.releaseCandidates.set('otherrealse', ['3']);

      service.polygonHovered(polygonsOfCandidate1[0]);

      expect(
        polygonsOfCandidate1[0].highlight && polygonsOfCandidate1[1].highlight
      ).toEqual(true);
      expect(polysOfCandidate2[0].highlight).toEqual(true);
      expect(polysOfCandidate3[0].highlight).toEqual(false);
    });
  });

  describe('#polygonUnhovered', () => {
    it('test', () => {
      const polygonsOfCandidate1: Polygon[] = [
        new Polygon([], '1'),
        new Polygon([], '1'),
      ];
      service.addPolygons(polygonsOfCandidate1);

      const polysOfCandidate2: Polygon[] = [new Polygon([], '2')];
      service.addPolygons(polysOfCandidate2);

      const polysOfCandidate3: Polygon[] = [new Polygon([], '3')];
      service.addPolygons(polysOfCandidate3);

      service.inRelease.set('1', 'release');
      service.inRelease.set('2', 'release');
      service.inRelease.set('3', 'otherrelease');
      service.releaseCandidates.set('release', ['1', '2']);
      service.releaseCandidates.set('otherrealse', ['3']);

      service.polygonHovered(polygonsOfCandidate1[0]);
      service.polygonUnhovered(polygonsOfCandidate1[1]);

      expect(polygonsOfCandidate1[0].highlight).toEqual(false);
      expect(polygonsOfCandidate1[1].highlight).toEqual(false);
      expect(polysOfCandidate2[0].highlight).toEqual(false);
      expect(polysOfCandidate3[0].highlight).toEqual(false);
    });
  });

  describe('#scale', () => {
    it('scale middle values', () => {
      expect(service.scale(3.5, 0, 10, 0, 100)).toBeCloseTo(35, 5);
      expect(service.scale(5, 0, 10, 0, 100)).toBeCloseTo(50, 5);
      expect(service.scale(9.1, 0, 10, 0, 100)).toBeCloseTo(91, 5);
    });

    it('scale range ends', () => {
      expect(service.scale(0, 0, 10, 0, 100)).toBeCloseTo(0, 5);
      expect(service.scale(10, 0, 10, 0, 100)).toBeCloseTo(100, 5);
    });

    it('scale to non intersecting ranges', () => {
      expect(service.scale(6, 0, 10, 100, 200)).toBeCloseTo(160, 5);
    });
  });

  describe('#sparseArray', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    it('amount equal to array length', () => {
      expect(service.sparseArray(array.length, array)).toEqual(array);
    });

    it('amount equal to length/2', () => {
      expect(service.sparseArray(array.length / 2, array)).toEqual(
        array.filter((value, index) => index % 2 === 0)
      );
    });

    it('amount bigger than length', () => {
      expect(service.sparseArray(array.length + 50, array)).toEqual(array);
    });

    it('length not divisible by amount', () => {
      const array2 = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
      ];
      expect(service.sparseArray(5, array2)).toEqual([1, 4, 7, 11, 14]);
      expect(service.sparseArray(5, array2, true)).toEqual([1, 4, 7, 11, 17]);
    });
  });
});
