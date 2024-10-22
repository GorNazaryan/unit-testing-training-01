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

  it('Should Open Add Transaction Dialog on Button Click', () => {
    const addTransactionBtn = fixture.debugElement.query(By.css('#add-transaction-btn'));
    addTransactionBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.addTransactionDialogOpen()).toBe(true);
  });

  it('Current Balance Should Be Calculated Correctly', () => {
    const transactions = component.transactions();
    const currentBalance = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    expect(component.currentBalance()).toBe(currentBalance);
  });

  it('Current Balance Should Be Updated After Adding Transaction', () => {
    const transactions = component.transactions();
    const currentBalance = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    component.addTransaction({amount: 100, title: 'test'});
    fixture.detectChanges();
    expect(component.currentBalance()).toBe(currentBalance + 100);
  });

  it('Current Balance Should Be Updated After Removing Transaction', () => {
    const transactions = component.transactions();
    const currentBalance = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    const firstTransactionId = component.transactions()[0].id;
    component.deleteTransaction(firstTransactionId)
    fixture.detectChanges();
    expect(component.currentBalance()).toBe(currentBalance - transactions[0].amount);
  });

});
