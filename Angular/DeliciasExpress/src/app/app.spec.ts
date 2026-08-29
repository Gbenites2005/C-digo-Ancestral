import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the restaurant landing page', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Delicias hechas para compartir');
    expect(compiled.querySelectorAll('.dish-card').length).toBeGreaterThan(0);
    expect(compiled.textContent).toContain('DeliciasExpress');
  });

  it('should show the recipe details when a dish is selected', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.openDish(app.dishes[0]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.recipe-page')).not.toBeNull();
    expect(compiled.textContent).toContain('Ingredientes');
    expect(compiled.textContent).toContain('Preparación');
  });
});
