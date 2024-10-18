import { ComponentFixture, TestBed } from '@angular/core/testing';
import TransactionsComponent from './transactions.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TransactionsComponent, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
  });

  it('Should Be Added In List on Button Click', () => {
    const transactionsComponentsCount = component.transactions().length;
    component.addTransaction({amount: 100, title: 'test'})
    fixture.detectChanges();
    expect(component.transactions().length).toBe(transactionsComponentsCount + 1);
  });

  it('Should Be Removed From List on Remove Btn Click', () => {
    const transactionsComponentsCount = component.transactions().length;
    const firstTransactionId = component.transactions()[0].id;
    component.deleteTransaction(firstTransactionId)
    fixture.detectChanges();
    expect(component.transactions().length).toBe(transactionsComponentsCount - 1);
  });

});
