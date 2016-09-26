package com.kornferry.dozer;

import static org.junit.Assert.assertEquals;

import org.dozer.DozerBeanMapper;
import org.dozer.loader.api.BeanMappingBuilder;
import org.junit.Before;
import org.junit.Test;

import com.kornferry.model.Person;
import com.kornferry.model.Personne;

public class DozerTest {

    DozerBeanMapper mapper;

    @Before
    public void before() throws Exception {
        mapper = new DozerBeanMapper();
    }

    BeanMappingBuilder builder = new BeanMappingBuilder() {

        @Override
        protected void configure() {
            mapping(Person.class, Personne.class).fields("name", "nom").fields("nickname", "surnom");

        }
    };
    BeanMappingBuilder builderMinusAge = new BeanMappingBuilder() {

        @Override
        protected void configure() {
            mapping(Person.class, Personne.class).fields("name", "nom").fields("nickname", "surnom").exclude("age");

        }
    };

    @Test
    public void givenApiMapper_whenMaps_thenCorrect() {
        mapper.addMapping(builder);

        Personne frenchAppPerson = new Personne("Sylvester Stallone", "Rambo", 70);
        Person englishAppPerson = mapper.map(frenchAppPerson, Person.class);

        assertEquals(englishAppPerson.getName(), frenchAppPerson.getNom());
        assertEquals(englishAppPerson.getNickname(), frenchAppPerson.getSurnom());
        assertEquals(englishAppPerson.getAge(), frenchAppPerson.getAge());
    }

    @Test
    public void givenApiMapper_whenMapsOnlySpecifiedFields_thenCorrect() {
        mapper.addMapping(builderMinusAge);

        Person englishAppPerson = new Person("Sylvester Stallone", "Rambo", 70);
        Personne frenchAppPerson = mapper.map(englishAppPerson, Personne.class);

        assertEquals(frenchAppPerson.getNom(), englishAppPerson.getName());
        assertEquals(frenchAppPerson.getSurnom(), englishAppPerson.getNickname());
        assertEquals(frenchAppPerson.getAge(), 0);
    }

    @Test
    public void givenApiMapper_whenMapsBidirectionally_thenCorrect() {
        mapper.addMapping(builder);

        Person englishAppPerson = new Person("Sylvester Stallone", "Rambo", 70);
        Personne frenchAppPerson = mapper.map(englishAppPerson, Personne.class);

        assertEquals(frenchAppPerson.getNom(), englishAppPerson.getName());
        assertEquals(frenchAppPerson.getSurnom(), englishAppPerson.getNickname());
        assertEquals(frenchAppPerson.getAge(), englishAppPerson.getAge());
    }



}
