from datetime import datetime

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    ForeignKey,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Language(Base):
    __tablename__ = "languages"

    language_code: Mapped[str] = mapped_column(
        String(10),
        primary_key=True,
    )

    language_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    native_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )


class Translation(Base):
    __tablename__ = "translations"

    translation_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )

    entity_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    entity_id: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    field_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    language_code: Mapped[str] = mapped_column(
    String(10),
    ForeignKey("languages.language_code"),
    nullable=False,
)

    translated_text: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint(
            "entity_type",
            "entity_id",
            "field_name",
            "language_code",
            name="uq_translation",
        ),
    )