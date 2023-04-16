import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies/movies.service'
import { NotAcceptableException, NotFoundException } from "@nestjs/common";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4",()=>{
    expect(2+2).toEqual(4)
  })

  describe("getAll",()=>{
    it("should return an array", function() {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array) // 배열을 리턴하는지안하는지 테스트 // 유닛테스트
    });
  })

  describe("getOne",()=>{
    it("should return a moive", function() {
      service.create({
        title : "TEST MOVIE",
        genres : ['test'],
        year : 2000,
      })
      const movie =service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1)
    });
    it("should throw 404 Error ", function() {
      try{
        service.getOne(999);
      }catch (e){
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    });
  })

  describe("deleteOne",()=>{
    it("delete a movie", ()=>{
      service.create({
        title : "TEST MOVIE",
        genres : ['test'],
        year : 2000,
      })
      const allMovies = service.getAll().length;
      service.deleteOne(1)
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies)
    })

    it("should throw 404 Error ", function() {
      try{
        service.getOne(999);
      }catch (e){
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    });
  })

  describe("create",()=>{
    it("should create a movie", ()=> {
      const beforeCreate = service.getAll().length
      service.create({
        title: "TEST MOVIE",
        genres: ['test'],
        year: 2000,
      })
      const afterCreate = service.getAll().length
      console.log(beforeCreate,afterCreate)
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
    it("should throw a NotFoundException ", function() {
      try{
        service.getOne(999);
      }catch (e){
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    });
  })

  describe("update",()=>{
    it("sholud update a movie" ,()=>{
      service.create({
        title: "TEST MOVIE",
        genres: ['test'],
        year: 2000,
      })
    service.update(1,{title:'UpdateTest'});
    const movie = service.getOne(1)
    expect(movie.title).toEqual('UpdateTest')

    })
  })
});

