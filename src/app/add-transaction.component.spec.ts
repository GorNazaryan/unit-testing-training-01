import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExpenseComponent } from './add-transaction.component';
import TransactionsComponent from './transactions.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddExpenseComponent', () => {
  let component: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [AddExpenseComponent, TransactionsComponent, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseComponent);
    component = fixture.componentInstance;
  });

  it('Should Open Dialog On Button Click', () => {
    component.open.set(true);
    const dialog = fixture.debugElement.query(By.css('dialog')).nativeElement as HTMLDialogElement;
    fixture.detectChanges();
    expect(dialog.open).toBe(true);
  })

  it('Should close dialog on button click', () => {
    component.open.set(false);
    const dialog = fixture.debugElement.query(By.css('dialog')).nativeElement as HTMLDialogElement;
    fixture.detectChanges();
    expect(dialog.open).toBe(false);
  });

  it('Should NOT add transaction on button click if form is invalid', () => {
    const transactionAdded = spyOn(component.transactionAdded, 'emit')
    component.form.patchValue({
      title: '',
      amount: 0
    });
    const button = fixture.debugElement.query(By.css('#add-transaction'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(transactionAdded).not.toHaveBeenCalled();
  });
});
