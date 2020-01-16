package com.paquery.maps.model;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CoordenateTest {

    @Test
    public void testDistanciaCero() {
        //
        Coordenate coord = new Coordenate(1.0d, 2.0d);

        Double norma = coord.calculateDistance(coord);

        assertEquals(0.0d, norma, 0.0000000001d);
    }

    @Test
    public void testDistanciaSimple() {
        //
        Coordenate coord = new Coordenate(1.0d, 2.0d);
        Coordenate coord2 = new Coordenate(3.0d, -1.0d);

        Double norma = coord.calculateDistance(coord2);

        assertEquals(13.0d, norma, 0.000001d);
    }

    @Test
    public void testDistancia41() {
        //
        Coordenate coord = new Coordenate(4.0d, -1.0d);
        Coordenate coord2 = new Coordenate(-1.0d, 3.0d);

        Double norma = coord.calculateDistance(coord2);

        assertEquals(41.0d, norma, 0.000001d);
    }

    @Test
    public void testDistancia2() {
        //
        Coordenate coord = new Coordenate(1.0d, 0.0d);
        Coordenate coord2 = new Coordenate(0.0d, 1.0d);

        Double norma = coord.calculateDistance(coord2);

        assertEquals(2.0d, norma, 0.000001d);
    }

    @Test
    public void testDistancia2inverted() {
        //
        Coordenate coord = new Coordenate(0.0d, 1.0d);
        Coordenate coord2 = new Coordenate(1.0d, 0.0d);

        Double norma = coord.calculateDistance(coord2);

        assertEquals(2.0d, norma, 0.000001d);
    }

    @Test
    public void testDistancialLongitudDouble10() {
        //
        Coordenate coord = new Coordenate(4.00001d, 2.00001d);
        Coordenate coord2 = new Coordenate(3.00000d, 5.00001d);

        Double norma = coord.calculateDistance(coord2);

        assertEquals(10.00002d, norma, 0.00001d);
    }

    @Test
    public void testDistancialLongitudDouble13() {
        //
        Coordenate coord = new Coordenate(2.62345d, 1.75541d);
        Coordenate coord2 = new Coordenate(3.54321d, 5.32165d);

        // operacion = (2,62345 - 3,54321)**2 + ( 1,75541 - 5,32165)**2
        // resultado = 13,5640261952
        Double norma = coord.calculateDistance(coord2);

        assertEquals(13.5640261952d, norma, 0.00000001d);
    }
}
